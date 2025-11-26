import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/snippets/route'
import { mockSupabaseClient, mockSnippet } from '../utils/testUtils'

// Mock dependencies
jest.mock('@/lib/supabase-server', () => ({
  createClient: jest.fn(() => mockSupabaseClient)
}))

jest.mock('@/services/snippetService')

describe('/api/snippets API 端点', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/snippets', () => {
    test('应该能够获取代码片段列表', async () => {
      const mockData = [mockSnippet]

      // Mock SnippetService
      const { SnippetService } = require('@/services/snippetService')
      SnippetService.prototype.getSnippets = jest.fn().mockResolvedValue({
        data: mockData,
        count: 1,
        error: null
      })

      const request = new NextRequest('http://localhost/api/snippets')
      const response = await GET(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData.data).toEqual(mockData)
      expect(responseData.count).toBe(1)
    })

    test('应该能够处理分页参数', async () => {
      const { SnippetService } = require('@/services/snippetService')
      const getSnippetsMock = jest.fn().mockResolvedValue({
        data: [],
        count: 0,
        error: null
      })
      SnippetService.prototype.getSnippets = getSnippetsMock

      const request = new NextRequest('http://localhost/api/snippets?page=2&limit=5')
      await GET(request)

      expect(getSnippetsMock).toHaveBeenCalledWith(
        expect.any(Object), // filters
        2, // page
        5  // limit
      )
    })

    test('应该能够处理语言过滤', async () => {
      const { SnippetService } = require('@/services/snippetService')
      const getSnippetsMock = jest.fn().mockResolvedValue({
        data: [],
        count: 0,
        error: null
      })
      SnippetService.prototype.getSnippets = getSnippetsMock

      const request = new NextRequest('http://localhost/api/snippets?language=javascript')
      await GET(request)

      expect(getSnippetsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          language: 'javascript'
        }),
        1,
        10
      )
    })

    test('服务错误时应该返回 500', async () => {
      const { SnippetService } = require('@/services/snippetService')
      SnippetService.prototype.getSnippets = jest.fn().mockRejectedValue(
        new Error('Database connection failed')
      )

      const request = new NextRequest('http://localhost/api/snippets')
      const response = await GET(request)

      expect(response.status).toBe(500)

      const responseData = await response.json()
      expect(responseData.error).toBe('服务器错误')
    })
  })

  describe('POST /api/snippets', () => {
    test('应该能够创建新的代码片段', async () => {
      const newSnippet = {
        title: 'New Snippet',
        content: 'console.log("new")',
        language: 'javascript',
        description: 'A new snippet'
      }

      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user123' } },
        error: null
      })

      const { SnippetService } = require('@/services/snippetService')
      SnippetService.prototype.createSnippet = jest.fn().mockResolvedValue({
        data: { ...newSnippet, id: 'snippet123' },
        error: null
      })

      const request = new NextRequest('http://localhost/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSnippet)
      })

      const response = await POST(request)
      expect(response.status).toBe(201)

      const responseData = await response.json()
      expect(responseData.data).toMatchObject(newSnippet)
    })

    test('未认证用户应该返回 401', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null
      })

      const request = new NextRequest('http://localhost/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      const response = await POST(request)
      expect(response.status).toBe(401)

      const responseData = await response.json()
      expect(responseData.error).toBe('未登录')
    })

    test('无效数据应该返回 400', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user123' } },
        error: null
      })

      const request = new NextRequest('http://localhost/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '' }) // 无效数据
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })
  })
})