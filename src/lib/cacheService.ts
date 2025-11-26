import { getRedisClient, CacheKeys, CacheTTL } from './redis'

export interface CacheOptions {
  ttl?: number
  forceRefresh?: boolean
  fallbackValue?: any
}

export class CacheService {
  private redis = getRedisClient()

  constructor() {
    // 在没有Redis连接时使用内存缓存
    if (!this.redis) {
      console.warn('⚠️ Redis not available, using memory cache')
    }
  }

  /**
   * 获取缓存值
   */
  async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
    if (!this.redis || options.forceRefresh) {
      return null
    }

    try {
      const cached = await this.redis.get(key)
      if (cached) {
        return JSON.parse(cached) as T
      }
      return null
    } catch (error) {
      console.warn('Cache get error:', error)
      return options.fallbackValue || null
    }
  }

  /**
   * 设置缓存值
   */
  async set(key: string, value: any, ttl: number = 300): Promise<boolean> {
    if (!this.redis) {
      return false
    }

    try {
      const serialized = JSON.stringify(value)
      await this.redis.setex(key, ttl, serialized)
      return true
    } catch (error) {
      console.warn('Cache set error:', error)
      return false
    }
  }

  /**
   * 删除缓存
   */
  async delete(key: string): Promise<boolean> {
    if (!this.redis) {
      return false
    }

    try {
      await this.redis.del(key)
      return true
    } catch (error) {
      console.warn('Cache delete error:', error)
      return false
    }
  }

  /**
   * 批量删除缓存（通过模式）
   */
  async deleteByPattern(pattern: string): Promise<number> {
    if (!this.redis) {
      return 0
    }

    try {
      const keys = await this.redis.keys(pattern)
      if (keys.length > 0) {
        await this.redis.del(...keys)
        return keys.length
      }
      return 0
    } catch (error) {
      console.warn('Cache delete by pattern error:', error)
      return 0
    }
  }

  /**
   * 缓存或获取数据的通用方法
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const ttl = options.ttl || 300

    // 先尝试获取缓存
    if (!options.forceRefresh) {
      const cached = await this.get<T>(key, options)
      if (cached !== null) {
        return cached
      }
    }

    // 缓存未命中，获取新数据
    try {
      const data = await fetcher()

      // 设置缓存
      if (data !== null && data !== undefined) {
        await this.set(key, data, ttl)
      }

      return data
    } catch (error) {
      // 如果获取数据失败，尝试返回过期的缓存
      const staleCache = await this.get<T>(key)
      if (staleCache !== null) {
        console.warn('Using stale cache due to fetch error:', error)
        return staleCache
      }

      // 如果有fallback值，返回它
      if (options.fallbackValue !== undefined) {
        return options.fallbackValue
      }

      throw error
    }
  }

  /**
   * 原子性增加计数器
   */
  async increment(key: string, amount: number = 1, ttl?: number): Promise<number> {
    if (!this.redis) {
      return amount
    }

    try {
      const pipeline = this.redis.pipeline()
      pipeline.incr(key)
      if (ttl) {
        pipeline.expire(key, ttl)
      }
      const results = await pipeline.exec()
      return results?.[0]?.[1] as number || amount
    } catch (error) {
      console.warn('Cache increment error:', error)
      return amount
    }
  }

  /**
   * 获取缓存健康状态
   */
  async health(): Promise<{ connected: boolean; latency?: number }> {
    if (!this.redis) {
      return { connected: false }
    }

    try {
      const start = Date.now()
      await this.redis.ping()
      const latency = Date.now() - start

      return { connected: true, latency }
    } catch (error) {
      return { connected: false }
    }
  }
}

// 单例实例
export const cacheService = new CacheService()

// 专门的缓存方法
export const CacheMethods = {
  // 代码片段缓存
  async getSnippet(id: string, fetcher: () => Promise<any>) {
    return cacheService.getOrSet(
      CacheKeys.snippet(id),
      fetcher,
      { ttl: CacheTTL.snippet }
    )
  },

  // 代码片段列表缓存
  async getSnippetList(filters: string, fetcher: () => Promise<any>) {
    return cacheService.getOrSet(
      CacheKeys.snippetList(filters),
      fetcher,
      { ttl: CacheTTL.snippetList }
    )
  },

  // 热门代码片段缓存
  async getPopularSnippets(fetcher: () => Promise<any>) {
    return cacheService.getOrSet(
      CacheKeys.popularSnippets(),
      fetcher,
      { ttl: CacheTTL.popularSnippets }
    )
  },

  // 搜索结果缓存
  async getSearchResults(query: string, page: number, fetcher: () => Promise<any>) {
    return cacheService.getOrSet(
      CacheKeys.searchResults(query, page),
      fetcher,
      { ttl: CacheTTL.searchResults }
    )
  },

  // 清除相关缓存
  async invalidateSnippet(id: string) {
    await Promise.all([
      cacheService.delete(CacheKeys.snippet(id)),
      cacheService.delete(CacheKeys.snippetStats(id)),
      cacheService.deleteByPattern(CacheKeys.snippetList('*')),
      cacheService.deleteByPattern(CacheKeys.searchResults('*', 0)),
      cacheService.delete(CacheKeys.popularSnippets()),
    ])
  },

  // 增加统计数据
  async incrementStats(type: 'view' | 'like' | 'share', id: string) {
    const key = `stats:${type}:${id}`
    return cacheService.increment(key, 1, CacheTTL.snippetStats)
  }
}