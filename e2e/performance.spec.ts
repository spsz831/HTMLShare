import { test, expect } from '@playwright/test'

test.describe('性能测试', () => {
  test('首页加载性能', async ({ page }) => {
    // 开始性能追踪
    await page.goto('/', { waitUntil: 'networkidle' })

    // 获取性能指标
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      }
    })

    console.log('Performance Metrics:', performanceMetrics)

    // 断言性能指标
    expect(performanceMetrics.domContentLoaded).toBeLessThan(3000) // DOM 应该在3秒内加载完成
    expect(performanceMetrics.loadComplete).toBeLessThan(5000) // 页面应该在5秒内完全加载
  })

  test('Core Web Vitals 检查', async ({ page }) => {
    await page.goto('/')

    // 等待页面完全加载
    await page.waitForLoadState('networkidle')

    // 获取 Web Vitals 指标
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics: any = {}

        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          if (entries.length > 0) {
            metrics.lcp = entries[entries.length - 1].startTime
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // CLS (Cumulative Layout Shift)
        let clsValue = 0
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          metrics.cls = clsValue
        }).observe({ entryTypes: ['layout-shift'] })

        // FID (First Input Delay) - 需要用户交互
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            metrics.fid = (entry as any).processingStart - entry.startTime
          }
        }).observe({ entryTypes: ['first-input'] })

        // 设置超时返回已收集的指标
        setTimeout(() => {
          resolve(metrics)
        }, 2000)
      })
    })

    console.log('Web Vitals:', webVitals)

    // 检查 LCP 性能
    if ((webVitals as any).lcp) {
      expect((webVitals as any).lcp).toBeLessThan(2500) // LCP 应该小于 2.5 秒
    }

    // 检查 CLS 性能
    if ((webVitals as any).cls !== undefined) {
      expect((webVitals as any).cls).toBeLessThan(0.1) // CLS 应该小于 0.1
    }
  })

  test('资源加载性能', async ({ page }) => {
    await page.goto('/')

    const resourceMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

      const metrics = {
        totalResources: resources.length,
        totalSize: 0,
        slowResources: 0,
        cssFiles: 0,
        jsFiles: 0,
        images: 0
      }

      resources.forEach(resource => {
        const duration = resource.responseEnd - resource.requestStart

        if (duration > 1000) {
          metrics.slowResources++
        }

        if (resource.name.endsWith('.css')) {
          metrics.cssFiles++
        } else if (resource.name.endsWith('.js')) {
          metrics.jsFiles++
        } else if (/\.(jpg|jpeg|png|gif|svg|webp)/.test(resource.name)) {
          metrics.images++
        }

        if (resource.transferSize) {
          metrics.totalSize += resource.transferSize
        }
      })

      return metrics
    })

    console.log('Resource Metrics:', resourceMetrics)

    // 断言资源性能
    expect(resourceMetrics.slowResources).toBeLessThan(5) // 慢资源应该少于5个
    expect(resourceMetrics.totalSize).toBeLessThan(5 * 1024 * 1024) // 总大小应该少于5MB
  })
})