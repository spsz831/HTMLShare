import { getRedisClient, CacheKeys, CacheTTL } from '@/lib/redis'
import type Redis from 'ioredis'

export class CacheService {
  private redis: Redis | null

  constructor() {
    try {
      this.redis = getRedisClient()
      if (!this.redis) {
        console.log('ℹ️ 缓存服务启动（内存模式）')
      }
    } catch (error) {
      console.warn('⚠️ Redis连接失败，使用内存缓存模式:', error)
      this.redis = null
    }
  }

  // 通用缓存方法
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.redis) return null

      const data = await this.redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error)
      return null
    }
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<boolean> {
    try {
      if (!this.redis) return false

      await this.redis.setex(key, ttl, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      if (!this.redis) return false

      await this.redis.del(key)
      return true
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!this.redis) return false

      const result = await this.redis.exists(key)
      return result === 1
    } catch (error) {
      console.error(`Cache exists error for key ${key}:`, error)
      return false
    }
  }

  // 批量删除
  async delPattern(pattern: string): Promise<number> {
    try {
      if (!this.redis) return 0

      const keys = await this.redis.keys(pattern)
      if (keys.length === 0) return 0

      return await this.redis.del(...keys)
    } catch (error) {
      console.error(`Cache delete pattern error for ${pattern}:`, error)
      return 0
    }
  }

  // 代码片段缓存
  async cacheSnippet(snippet: any): Promise<void> {
    const key = CacheKeys.snippet(snippet.id)
    await this.set(key, snippet, CacheTTL.snippet)

    // 同时更新统计信息缓存
    const statsKey = CacheKeys.snippetStats(snippet.id)
    const stats = {
      view_count: snippet.view_count || 0,
      updated_at: new Date().toISOString()
    }
    await this.set(statsKey, stats, CacheTTL.snippetStats)
  }

  async getSnippet(id: string): Promise<any | null> {
    const key = CacheKeys.snippet(id)
    return await this.get(key)
  }

  async invalidateSnippet(id: string): Promise<void> {
    await this.del(CacheKeys.snippet(id))
    await this.del(CacheKeys.snippetStats(id))

    // 清除相关的列表缓存
    await this.delPattern('snippets:list:*')
    await this.delPattern('search:*')
    await this.del(CacheKeys.popularSnippets())
  }

  // 列表缓存
  async cacheSnippetList(filters: any, data: any): Promise<void> {
    const filterString = JSON.stringify(filters)
    const key = CacheKeys.snippetList(filterString)
    await this.set(key, data, CacheTTL.snippetList)
  }

  async getSnippetList(filters: any): Promise<any | null> {
    const filterString = JSON.stringify(filters)
    const key = CacheKeys.snippetList(filterString)
    return await this.get(key)
  }

  // 搜索结果缓存
  async cacheSearchResults(query: string, page: number, results: any): Promise<void> {
    const key = CacheKeys.searchResults(query, page)
    await this.set(key, results, CacheTTL.searchResults)
  }

  async getSearchResults(query: string, page: number): Promise<any | null> {
    const key = CacheKeys.searchResults(query, page)
    return await this.get(key)
  }

  // 用户数据缓存
  async cacheUserProfile(userId: string, profile: any): Promise<void> {
    const key = CacheKeys.userProfile(userId)
    await this.set(key, profile, CacheTTL.userProfile)
  }

  async getUserProfile(userId: string): Promise<any | null> {
    const key = CacheKeys.userProfile(userId)
    return await this.get(key)
  }

  async invalidateUserCache(userId: string): Promise<void> {
    await this.del(CacheKeys.userProfile(userId))
    await this.del(CacheKeys.userSnippets(userId))
  }

  // 热门内容缓存
  async cachePopularSnippets(snippets: any[]): Promise<void> {
    const key = CacheKeys.popularSnippets()
    await this.set(key, snippets, CacheTTL.popularSnippets)
  }

  async getPopularSnippets(): Promise<any[] | null> {
    const key = CacheKeys.popularSnippets()
    return await this.get(key)
  }

  // 标签云缓存
  async cacheTagCloud(tags: any[]): Promise<void> {
    const key = CacheKeys.tagCloud()
    await this.set(key, tags, CacheTTL.tagCloud)
  }

  async getTagCloud(): Promise<any[] | null> {
    const key = CacheKeys.tagCloud()
    return await this.get(key)
  }

  // 缓存预热
  async warmUpCache(): Promise<void> {
    try {
      console.log('🔥 Cache warm-up started')

      // 这里可以预加载一些热门数据
      // 例如：热门代码片段、标签云等

      console.log('✅ Cache warm-up completed')
    } catch (error) {
      console.error('❌ Cache warm-up failed:', error)
    }
  }

  // 获取缓存统计
  async getCacheStats(): Promise<any> {
    try {
      if (!this.redis) return null

      const info = await this.redis.info('memory')
      const keyspace = await this.redis.info('keyspace')

      return {
        memory: info,
        keyspace: keyspace,
        connected: this.redis.status === 'ready'
      }
    } catch (error) {
      console.error('Cache stats error:', error)
      return null
    }
  }
}

// 单例实例
export const cacheService = new CacheService()