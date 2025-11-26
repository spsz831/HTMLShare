import React from 'react'

// 性能监控工具类
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()
  private isProduction = process.env.NODE_ENV === 'production'

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 记录页面加载性能
  public recordPageLoad(pageName: string) {
    if (!window.performance) return

    const timing = window.performance.timing
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    const metrics = {
      pageName,
      timestamp: Date.now(),
      // 关键性能指标
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      firstByte: timing.responseStart - timing.navigationStart,
      domReady: timing.domComplete - timing.navigationStart,
      // Web Vitals 相关
      ...(navigation && {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ssl: navigation.secureConnectionStart ? navigation.connectEnd - navigation.secureConnectionStart : 0,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domProcessing: navigation.domComplete - navigation.responseEnd
      })
    }

    this.logMetrics('PAGE_LOAD', metrics)
    this.sendToAnalytics('page_performance', metrics)
  }

  // 记录API请求性能
  public recordApiCall(endpoint: string, duration: number, success: boolean, statusCode?: number) {
    const metrics = {
      endpoint,
      duration,
      success,
      statusCode,
      timestamp: Date.now()
    }

    this.logMetrics('API_CALL', metrics)
    this.sendToAnalytics('api_performance', metrics)
  }

  // 记录用户交互性能
  public recordUserInteraction(action: string, duration: number) {
    const metrics = {
      action,
      duration,
      timestamp: Date.now()
    }

    this.logMetrics('USER_INTERACTION', metrics)
    this.sendToAnalytics('user_interaction', metrics)
  }

  // 记录自定义性能指标
  public recordCustomMetric(name: string, value: number, metadata?: Record<string, any>) {
    const metrics = {
      name,
      value,
      metadata,
      timestamp: Date.now()
    }

    this.logMetrics('CUSTOM_METRIC', metrics)
    this.sendToAnalytics('custom_metric', metrics)
  }

  // Core Web Vitals 监控
  public startWebVitalsMonitoring() {
    if (!window) return

    // LCP (Largest Contentful Paint)
    this.observeLCP()
    // FID (First Input Delay)
    this.observeFID()
    // CLS (Cumulative Layout Shift)
    this.observeCLS()
  }

  private observeLCP() {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any

        this.recordCustomMetric('LCP', lastEntry.startTime, {
          element: lastEntry.element?.tagName,
          url: lastEntry.url
        })
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP monitoring failed:', error)
    }
  }

  private observeFID() {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.recordCustomMetric('FID', entry.processingStart - entry.startTime, {
            eventType: entry.name
          })
        })
      })

      observer.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID monitoring failed:', error)
    }
  }

  private observeCLS() {
    if (!('PerformanceObserver' in window)) return

    let clsValue = 0

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })

        this.recordCustomMetric('CLS', clsValue)
      })

      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS monitoring failed:', error)
    }
  }

  // 性能阈值检查
  public checkPerformanceThresholds(metrics: any) {
    const thresholds = {
      loadComplete: 3000, // 3s
      firstByte: 1000,    // 1s
      apiCall: 2000,      // 2s
      userInteraction: 100 // 100ms
    }

    Object.entries(thresholds).forEach(([metric, threshold]) => {
      if (metrics[metric] && metrics[metric] > threshold) {
        console.warn(`⚠️ Performance threshold exceeded for ${metric}:`, {
          actual: metrics[metric],
          threshold,
          metrics
        })

        this.sendToAnalytics('performance_warning', {
          metric,
          actual: metrics[metric],
          threshold,
          timestamp: Date.now()
        })
      }
    })
  }

  private logMetrics(type: string, data: any) {
    if (!this.isProduction) {
      console.group(`📊 Performance Monitor - ${type}`)
      console.table(data)
      console.groupEnd()
    }

    // 检查性能阈值
    this.checkPerformanceThresholds(data)
  }

  private async sendToAnalytics(event: string, data: any) {
    try {
      // 只在生产环境发送到真实分析服务
      if (this.isProduction) {
        await fetch('/api/analytics/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event, data, timestamp: Date.now() })
        })
      }
    } catch (error) {
      console.warn('Failed to send analytics:', error)
    }
  }

  // 获取当前页面性能快照
  public getPerformanceSnapshot() {
    if (!window.performance) return null

    const timing = window.performance.timing
    const memory = (window.performance as any).memory

    return {
      timing: {
        navigationStart: timing.navigationStart,
        domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
        loadEventEnd: timing.loadEventEnd,
        responseStart: timing.responseStart,
        domComplete: timing.domComplete
      },
      memory: memory ? {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      } : null,
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt
      } : null,
      timestamp: Date.now()
    }
  }
}

// 创建全局实例
export const performanceMonitor = PerformanceMonitor.getInstance()

// 自动启动Web Vitals监控
if (typeof window !== 'undefined') {
  performanceMonitor.startWebVitalsMonitoring()
}

// Hook for measuring component render time
export function usePerfMeasure(componentName: string) {
  const startTime = React.useRef<number>()

  React.useLayoutEffect(() => {
    startTime.current = performance.now()
  })

  React.useEffect(() => {
    if (startTime.current) {
      const duration = performance.now() - startTime.current
      performanceMonitor.recordCustomMetric('component_render', duration, {
        component: componentName
      })
    }
  })
}

// API调用性能装饰器
export function withApiPerformanceTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  endpoint: string
): T {
  return (async (...args: any[]) => {
    const startTime = performance.now()
    let success = true
    let statusCode: number | undefined

    try {
      const result = await fn(...args)

      // 如果返回结果是Response对象
      if (result instanceof Response) {
        statusCode = result.status
        success = result.ok
      }

      return result
    } catch (error) {
      success = false
      throw error
    } finally {
      const duration = performance.now() - startTime
      performanceMonitor.recordApiCall(endpoint, duration, success, statusCode)
    }
  }) as T
}