import {
  withPerformanceMonitoring,
  BatchProcessor,
  CacheWarmer,
  DatabaseMonitor
} from '@/utils/performanceUtils'

describe('Performance Utils', () => {
  describe('withPerformanceMonitoring', () => {
    test('应该记录函数执行时间', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      const mockFn = jest.fn().mockResolvedValue('result')

      const monitoredFn = withPerformanceMonitoring(mockFn, 'testFunction')
      const result = await monitoredFn('arg1', 'arg2')

      expect(result).toBe('result')
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚡ testFunction executed in')
      )

      consoleSpy.mockRestore()
    })

    test('慢查询应该被标记为警告', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      const slowFn = jest.fn().mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 1100)) // 模拟慢查询
        return 'result'
      })

      const monitoredFn = withPerformanceMonitoring(slowFn, 'slowFunction')
      await monitoredFn()

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🐌 Slow query detected: slowFunction took')
      )

      consoleSpy.mockRestore()
    })

    test('函数抛出异常时应该记录错误', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
      const errorFn = jest.fn().mockRejectedValue(new Error('Test error'))

      const monitoredFn = withPerformanceMonitoring(errorFn, 'errorFunction')

      await expect(monitoredFn()).rejects.toThrow('Test error')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ errorFunction failed after'),
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('BatchProcessor', () => {
    test('应该能够批处理请求', async () => {
      const batchFn = jest.fn().mockImplementation(async (ids: string[]) => {
        return ids.map(id => ({ id, data: `data-${id}` }))
      })

      const processor = new BatchProcessor(batchFn, 10, 3)

      const promises = [
        processor.get('1'),
        processor.get('2'),
        processor.get('3')
      ]

      const results = await Promise.all(promises)

      expect(batchFn).toHaveBeenCalledTimes(1)
      expect(batchFn).toHaveBeenCalledWith(['1', '2', '3'])
      expect(results).toEqual([
        { id: '1', data: 'data-1' },
        { id: '2', data: 'data-2' },
        { id: '3', data: 'data-3' }
      ])
    })

    test('超过最大批次大小时应该立即处理', async () => {
      const batchFn = jest.fn().mockImplementation(async (ids: string[]) => {
        return ids.map(id => ({ id, data: `data-${id}` }))
      })

      const processor = new BatchProcessor(batchFn, 100, 2) // maxBatchSize = 2

      const promises = [
        processor.get('1'),
        processor.get('2'),
        processor.get('3')
      ]

      await Promise.all(promises)

      expect(batchFn).toHaveBeenCalledTimes(2) // 第一批2个，第二批1个
    })

    test('批处理函数抛出异常时应该正确处理', async () => {
      const batchFn = jest.fn().mockRejectedValue(new Error('Batch failed'))
      const processor = new BatchProcessor(batchFn)

      await expect(processor.get('1')).rejects.toThrow('Batch failed')
    })
  })

  describe('CacheWarmer', () => {
    test('应该是单例模式', () => {
      const instance1 = CacheWarmer.getInstance()
      const instance2 = CacheWarmer.getInstance()

      expect(instance1).toBe(instance2)
    })

    test('同时只能运行一个预热任务', async () => {
      const cacheWarmer = CacheWarmer.getInstance()
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      // 模拟预热方法
      jest.spyOn(cacheWarmer as any, 'warmPopularContent').mockResolvedValue(undefined)
      jest.spyOn(cacheWarmer as any, 'warmTagStatistics').mockResolvedValue(undefined)
      jest.spyOn(cacheWarmer as any, 'warmLatestContent').mockResolvedValue(undefined)

      const warmUp1 = cacheWarmer.warmUp()
      const warmUp2 = cacheWarmer.warmUp()

      await Promise.all([warmUp1, warmUp2])

      // 应该只执行一次预热
      expect(consoleSpy).toHaveBeenCalledWith('🔥 Starting cache warm-up...')
      expect(consoleSpy).toHaveBeenCalledWith('✅ Cache warm-up completed')

      consoleSpy.mockRestore()
    })
  })

  describe('DatabaseMonitor', () => {
    let monitor: DatabaseMonitor

    beforeEach(() => {
      monitor = DatabaseMonitor.getInstance()
      monitor.reset()
    })

    test('应该记录查询指标', () => {
      monitor.recordQuery(100)
      monitor.recordQuery(200)
      monitor.recordQuery(1500) // 慢查询

      const metrics = monitor.getMetrics()

      expect(metrics.queryCount).toBe(3)
      expect(metrics.totalQueryTime).toBe(1800)
      expect(metrics.averageQueryTime).toBe(600)
      expect(metrics.slowQueries).toBe(1)
    })

    test('应该记录缓存命中率', () => {
      monitor.recordCacheHit()
      monitor.recordCacheHit()
      monitor.recordCacheMiss()

      const metrics = monitor.getMetrics()

      expect(metrics.cacheHits).toBe(2)
      expect(metrics.cacheMisses).toBe(1)
      expect(metrics.cacheHitRate).toBeCloseTo(0.67, 2)
    })

    test('reset 方法应该清空所有指标', () => {
      monitor.recordQuery(100)
      monitor.recordCacheHit()
      monitor.reset()

      const metrics = monitor.getMetrics()

      expect(metrics.queryCount).toBe(0)
      expect(metrics.cacheHits).toBe(0)
      expect(metrics.averageQueryTime).toBe(0)
      expect(metrics.cacheHitRate).toBe(0)
    })
  })
})