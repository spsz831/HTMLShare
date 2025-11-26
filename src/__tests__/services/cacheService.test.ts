import { CacheService } from '@/services/cacheService'
import { mockRedisClient } from '../utils/testUtils'

// Mock Redis
jest.mock('@/lib/redis', () => ({
  getRedisClient: () => mockRedisClient,
  CacheKeys: {
    snippet: (id: string) => `snippet:${id}`,
    snippetList: (filters: string) => `snippets:list:${filters}`,
    popularSnippets: () => 'snippets:popular'
  },
  CacheTTL: {
    snippet: 3600,
    snippetList: 300,
    popularSnippets: 1800
  }
}))

describe('CacheService', () => {
  let cacheService: CacheService

  beforeEach(() => {
    cacheService = new CacheService()
    jest.clearAllMocks()
  })

  describe('基本缓存操作', () => {
    test('应该能够设置和获取缓存', async () => {
      const testData = { id: '123', name: 'test' }
      const key = 'test:key'

      mockRedisClient.get.mockResolvedValue(JSON.stringify(testData))
      mockRedisClient.setex.mockResolvedValue('OK')

      // 设置缓存
      const setResult = await cacheService.set(key, testData, 300)
      expect(setResult).toBe(true)
      expect(mockRedisClient.setex).toHaveBeenCalledWith(key, 300, JSON.stringify(testData))

      // 获取缓存
      const getResult = await cacheService.get(key)
      expect(getResult).toEqual(testData)
      expect(mockRedisClient.get).toHaveBeenCalledWith(key)
    })

    test('获取不存在的缓存应该返回 null', async () => {
      mockRedisClient.get.mockResolvedValue(null)

      const result = await cacheService.get('nonexistent:key')
      expect(result).toBeNull()
    })

    test('应该能够删除缓存', async () => {
      const key = 'test:key'
      mockRedisClient.del.mockResolvedValue(1)

      const result = await cacheService.del(key)
      expect(result).toBe(true)
      expect(mockRedisClient.del).toHaveBeenCalledWith(key)
    })

    test('应该能够检查缓存是否存在', async () => {
      const key = 'test:key'
      mockRedisClient.exists.mockResolvedValue(1)

      const result = await cacheService.exists(key)
      expect(result).toBe(true)
      expect(mockRedisClient.exists).toHaveBeenCalledWith(key)
    })
  })

  describe('代码片段缓存', () => {
    test('应该能够缓存代码片段', async () => {
      const snippet = {
        id: '123',
        title: 'Test Snippet',
        content: 'console.log("test")',
        view_count: 10,
        like_count: 5
      }

      mockRedisClient.setex.mockResolvedValue('OK')

      await cacheService.cacheSnippet(snippet)

      expect(mockRedisClient.setex).toHaveBeenCalledTimes(2) // snippet + stats
      expect(mockRedisClient.setex).toHaveBeenCalledWith(
        'snippet:123',
        3600,
        JSON.stringify(snippet)
      )
    })

    test('应该能够获取缓存的代码片段', async () => {
      const snippet = { id: '123', title: 'Test Snippet' }
      mockRedisClient.get.mockResolvedValue(JSON.stringify(snippet))

      const result = await cacheService.getSnippet('123')

      expect(result).toEqual(snippet)
      expect(mockRedisClient.get).toHaveBeenCalledWith('snippet:123')
    })

    test('invalidateSnippet 应该清除相关缓存', async () => {
      mockRedisClient.del.mockResolvedValue(1)
      mockRedisClient.keys.mockResolvedValue(['snippets:list:filter1', 'search:query1'])

      await cacheService.invalidateSnippet('123')

      expect(mockRedisClient.del).toHaveBeenCalledWith('snippet:123')
      expect(mockRedisClient.del).toHaveBeenCalledWith('snippet:123:stats')
    })
  })

  describe('错误处理', () => {
    test('Redis 连接失败时应该优雅降级', async () => {
      const cacheServiceWithoutRedis = new (class extends CacheService {
        constructor() {
          super()
          // @ts-ignore
          this.redis = null
        }
      })()

      const result = await cacheServiceWithoutRedis.get('test:key')
      expect(result).toBeNull()

      const setResult = await cacheServiceWithoutRedis.set('test:key', 'data')
      expect(setResult).toBe(false)
    })

    test('JSON 解析失败时应该返回 null', async () => {
      mockRedisClient.get.mockResolvedValue('invalid json')

      const result = await cacheService.get('test:key')
      expect(result).toBeNull()
    })

    test('Redis 操作抛出异常时应该处理', async () => {
      mockRedisClient.get.mockRejectedValue(new Error('Redis connection failed'))

      const result = await cacheService.get('test:key')
      expect(result).toBeNull()
    })
  })

  describe('性能测试', () => {
    test('缓存操作应该在合理时间内完成', async () => {
      mockRedisClient.get.mockResolvedValue(JSON.stringify({ test: 'data' }))

      const start = performance.now()
      await cacheService.get('test:key')
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100) // 应该在 100ms 内完成
    })
  })
})