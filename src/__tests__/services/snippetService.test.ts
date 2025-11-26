import { SnippetService } from '@/services/snippetService'
import { LanguageType } from '@/types/database'
import { mockSupabaseClient, mockSnippet, mockSearchFilters } from '../utils/testUtils'

// Mock dependencies
jest.mock('@/lib/supabase-server', () => ({
  createClient: jest.fn(() => mockSupabaseClient)
}))

jest.mock('@/lib/supabase', () => ({
  supabase: mockSupabaseClient
}))

jest.mock('@/services/cacheService', () => ({
  cacheService: {
    getSnippetList: jest.fn(),
    cacheSnippetList: jest.fn(),
    getSnippet: jest.fn(),
    cacheSnippet: jest.fn(),
    invalidateSnippet: jest.fn()
  }
}))

describe('SnippetService', () => {
  let snippetService: SnippetService

  beforeEach(() => {
    snippetService = new SnippetService(false, true)
    jest.clearAllMocks()

    // 默认的成功响应
    mockSupabaseClient.single.mockResolvedValue({ data: mockSnippet, error: null })
    mockSupabaseClient.from.mockReturnValue(mockSupabaseClient)
  })

  describe('getSnippets', () => {
    test('应该能够获取代码片段列表', async () => {
      const mockData = [mockSnippet]
      mockSupabaseClient.single = undefined // 移除 single 方法

      // Mock query chain
      const mockQuery = Promise.resolve({
        data: mockData,
        error: null,
        count: 1
      })

      mockSupabaseClient.select.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.eq.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.order.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.range.mockReturnValue(mockQuery)

      const result = await snippetService.getSnippets(mockSearchFilters, 1, 10)

      expect(result).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: mockSnippet.id,
            title: mockSnippet.title,
            tags: expect.any(Array)
          })
        ]),
        count: 1,
        error: null
      })

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('snippets')
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('is_public', true)
      expect(mockSupabaseClient.order).toHaveBeenCalledWith('created_at', { ascending: false })
    })

    test('应该能够应用语言过滤', async () => {
      const filters = { ...mockSearchFilters, language: 'javascript' as LanguageType }

      mockSupabaseClient.select.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.eq.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.order.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.range.mockResolvedValue({ data: [mockSnippet], error: null, count: 1 })

      await snippetService.getSnippets(filters)

      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('language', 'javascript')
    })

    test('应该能够处理分页', async () => {
      const page = 2
      const limit = 10
      const expectedOffset = (page - 1) * limit

      mockSupabaseClient.select.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.eq.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.order.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.range.mockResolvedValue({ data: [], error: null, count: 0 })

      await snippetService.getSnippets(mockSearchFilters, page, limit)

      expect(mockSupabaseClient.range).toHaveBeenCalledWith(expectedOffset, expectedOffset + limit - 1)
    })

    test('数据库错误时应该返回错误信息', async () => {
      const errorMessage = 'Database connection failed'

      mockSupabaseClient.select.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.eq.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.order.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.range.mockResolvedValue({ data: null, error: { message: errorMessage }, count: 0 })

      const result = await snippetService.getSnippets()

      expect(result).toEqual({
        data: [],
        count: 0,
        error: errorMessage
      })
    })
  })

  describe('getSnippetById', () => {
    test('应该能够根据ID获取代码片段', async () => {
      const snippetId = '123'
      mockSupabaseClient.single.mockResolvedValue({ data: mockSnippet, error: null })

      const result = await snippetService.getSnippetById(snippetId)

      expect(result).toEqual({
        data: expect.objectContaining({
          id: mockSnippet.id,
          title: mockSnippet.title,
          tags: expect.any(Array)
        }),
        error: null
      })

      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', snippetId)
    })

    test('代码片段不存在时应该返回错误', async () => {
      mockSupabaseClient.single.mockResolvedValue({
        data: null,
        error: { message: 'No rows returned' }
      })

      const result = await snippetService.getSnippetById('nonexistent')

      expect(result).toEqual({
        data: null,
        error: 'No rows returned'
      })
    })

    test('应该自动增加浏览次数', async () => {
      const snippetId = '123'
      const snippetData = { ...mockSnippet, view_count: 10 }

      mockSupabaseClient.single.mockResolvedValue({ data: snippetData, error: null })
      mockSupabaseClient.update.mockReturnValue(mockSupabaseClient)
      mockSupabaseClient.eq.mockReturnValue(Promise.resolve({ data: null, error: null }))

      await snippetService.getSnippetById(snippetId)

      expect(mockSupabaseClient.update).toHaveBeenCalledWith({ view_count: 11 })
    })
  })

  describe('缓存集成', () => {
    test('应该使用缓存获取代码片段', async () => {
      const { cacheService } = require('@/services/cacheService')
      cacheService.getSnippet.mockResolvedValue(mockSnippet)

      const result = await snippetService.getSnippetById('123')

      expect(cacheService.getSnippet).toHaveBeenCalledWith('123')
      expect(result.data).toEqual(mockSnippet)
    })

    test('缓存未命中时应该查询数据库', async () => {
      const { cacheService } = require('@/services/cacheService')
      cacheService.getSnippet.mockResolvedValue(null)
      mockSupabaseClient.single.mockResolvedValue({ data: mockSnippet, error: null })

      await snippetService.getSnippetById('123')

      expect(mockSupabaseClient.select).toHaveBeenCalled()
      expect(cacheService.cacheSnippet).toHaveBeenCalled()
    })
  })

  describe('性能测试', () => {
    test('getSnippets 应该在合理时间内完成', async () => {
      mockSupabaseClient.range.mockResolvedValue({ data: [mockSnippet], error: null, count: 1 })

      const start = performance.now()
      await snippetService.getSnippets()
      const duration = performance.now() - start

      expect(duration).toBeLessThan(1000) // 应该在 1 秒内完成
    })

    test('大量数据查询应该有合理的性能', async () => {
      const largeDataSet = Array(100).fill(null).map((_, i) => ({
        ...mockSnippet,
        id: `snippet-${i}`
      }))

      mockSupabaseClient.range.mockResolvedValue({
        data: largeDataSet,
        error: null,
        count: largeDataSet.length
      })

      const start = performance.now()
      await snippetService.getSnippets({}, 1, 100)
      const duration = performance.now() - start

      expect(duration).toBeLessThan(2000) // 处理 100 条记录应该在 2 秒内
    })
  })
})