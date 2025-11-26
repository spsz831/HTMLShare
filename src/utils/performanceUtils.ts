import { optimizedQueryService } from '@/services/optimizedQueryService'
import { cacheService } from '@/services/cacheService'

// 性能监控中间件
export function withPerformanceMonitoring<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  name: string
) {
  return async (...args: T): Promise<R> => {
    const startTime = performance.now()

    try {
      const result = await fn(...args)
      const endTime = performance.now()
      const duration = endTime - startTime

      // 记录性能指标
      console.log(`⚡ ${name} executed in ${duration.toFixed(2)}ms`)

      // 如果执行时间过长，记录警告
      if (duration > 1000) {
        console.warn(`🐌 Slow query detected: ${name} took ${duration.toFixed(2)}ms`)
      }

      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime

      console.error(`❌ ${name} failed after ${duration.toFixed(2)}ms:`, error)
      throw error
    }
  }
}

// 批处理工具
export class BatchProcessor {
  private queue: Array<{
    id: string
    resolver: (value: any) => void
    rejecter: (error: any) => void
  }> = []

  private timer: NodeJS.Timeout | null = null
  private processing = false

  constructor(
    private batchFn: (ids: string[]) => Promise<any[]>,
    private delay = 10, // 10ms 批处理延迟
    private maxBatchSize = 50
  ) {}

  async get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ id, resolver: resolve, rejecter: reject })

      if (this.queue.length >= this.maxBatchSize) {
        this.flush()
      } else if (!this.timer) {
        this.timer = setTimeout(() => this.flush(), this.delay)
      }
    })
  }

  private async flush() {
    if (this.processing || this.queue.length === 0) return

    this.processing = true

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    const batch = this.queue.splice(0, this.maxBatchSize)
    const ids = batch.map(item => item.id)

    try {
      const results = await this.batchFn(ids)

      // 将结果分发给对应的 Promise
      batch.forEach((item, index) => {
        const result = results.find((r: any) => r.id === item.id)
        item.resolver(result || null)
      })
    } catch (error) {
      // 所有请求都失败
      batch.forEach(item => item.rejecter(error))
    }

    this.processing = false

    // 如果还有队列，继续处理
    if (this.queue.length > 0) {
      this.flush()
    }
  }
}

// 创建代码片段批处理器
export const snippetBatchProcessor = new BatchProcessor(
  async (ids: string[]) => {
    const { data } = await optimizedQueryService.getBatchSnippets(ids)
    return data
  }
)

// 缓存预热功能
export class CacheWarmer {
  private static instance: CacheWarmer
  private isWarming = false

  static getInstance() {
    if (!CacheWarmer.instance) {
      CacheWarmer.instance = new CacheWarmer()
    }
    return CacheWarmer.instance
  }

  async warmUp() {
    if (this.isWarming) return
    this.isWarming = true

    try {
      console.log('🔥 Starting cache warm-up...')

      // 预热热门内容
      await this.warmPopularContent()

      // 预热标签统计
      await this.warmTagStatistics()

      // 预热最新内容
      await this.warmLatestContent()

      console.log('✅ Cache warm-up completed')
    } catch (error) {
      console.error('❌ Cache warm-up failed:', error)
    } finally {
      this.isWarming = false
    }
  }

  private async warmPopularContent() {
    try {
      await optimizedQueryService.getPopularSnippets(20)
      console.log('📦 Popular content warmed')
    } catch (error) {
      console.error('Failed to warm popular content:', error)
    }
  }

  private async warmTagStatistics() {
    try {
      await optimizedQueryService.getTagStatistics()
      console.log('📦 Tag statistics warmed')
    } catch (error) {
      console.error('Failed to warm tag statistics:', error)
    }
  }

  private async warmLatestContent() {
    try {
      await optimizedQueryService.getPaginatedSnippets({
        page: 1,
        limit: 20,
        sortBy: 'created_at',
        sortOrder: 'desc'
      })
      console.log('📦 Latest content warmed')
    } catch (error) {
      console.error('Failed to warm latest content:', error)
    }
  }
}

// 性能优化的 Hook
export function useOptimizedQuery<T>(
  queryFn: () => Promise<T>,
  deps: any[],
  options: {
    cacheKey?: string
    cacheTTL?: number
    enableBatching?: boolean
  } = {}
) {
  // 这是一个示例 Hook，实际使用时需要根据 React 环境调整
  const { cacheKey, cacheTTL = 300, enableBatching = false } = options

  return {
    // 实际的 Hook 实现会在这里
    execute: async () => {
      if (cacheKey) {
        const cached = await cacheService.get(cacheKey)
        if (cached) return cached
      }

      const result = await queryFn()

      if (cacheKey && result) {
        await cacheService.set(cacheKey, result, cacheTTL)
      }

      return result
    }
  }
}

// 数据库连接池监控
export class DatabaseMonitor {
  private static instance: DatabaseMonitor
  private metrics = {
    queryCount: 0,
    totalQueryTime: 0,
    slowQueries: 0,
    cacheHits: 0,
    cacheMisses: 0
  }

  static getInstance() {
    if (!DatabaseMonitor.instance) {
      DatabaseMonitor.instance = new DatabaseMonitor()
    }
    return DatabaseMonitor.instance
  }

  recordQuery(duration: number) {
    this.metrics.queryCount++
    this.metrics.totalQueryTime += duration

    if (duration > 1000) {
      this.metrics.slowQueries++
    }
  }

  recordCacheHit() {
    this.metrics.cacheHits++
  }

  recordCacheMiss() {
    this.metrics.cacheMisses++
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageQueryTime: this.metrics.queryCount > 0
        ? this.metrics.totalQueryTime / this.metrics.queryCount
        : 0,
      cacheHitRate: this.metrics.cacheHits + this.metrics.cacheMisses > 0
        ? this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses)
        : 0
    }
  }

  reset() {
    this.metrics = {
      queryCount: 0,
      totalQueryTime: 0,
      slowQueries: 0,
      cacheHits: 0,
      cacheMisses: 0
    }
  }
}

// 导出工具
export const dbMonitor = DatabaseMonitor.getInstance()
export const cacheWarmer = CacheWarmer.getInstance()