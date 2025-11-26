'use client'

import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals'
import { useEffect } from 'react'

interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  userAgent: string
}

// Web Vitals 评分标准
const VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 }
}

// 获取指标评分
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

// 发送指标到分析服务
async function sendMetricToAnalytics(metric: WebVitalsMetric) {
  try {
    // 发送到自定义分析端点
    await fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
      keepalive: true // 确保在页面卸载时也能发送
    })

    // 也可以发送到其他分析服务（如 Google Analytics）
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: {
          metric_rating: metric.rating
        }
      })
    }

    console.log(`📊 Web Vitals - ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      url: metric.url
    })
  } catch (error) {
    console.error('Failed to send metric:', error)
  }
}

// 处理单个指标
function handleMetric(metric: Metric) {
  const webVitalsMetric: WebVitalsMetric = {
    name: metric.name,
    value: metric.value,
    rating: getMetricRating(metric.name, metric.value),
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }

  sendMetricToAnalytics(webVitalsMetric)
}

// Web Vitals 监控组件
export default function WebVitalsMonitor() {
  useEffect(() => {
    // 初始化所有 Web Vitals 指标监控
    onCLS(handleMetric)
    onINP(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)

    // 页面可见性变化时也收集指标
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // 页面即将隐藏时，收集当前的指标
        onCLS(handleMetric, { reportAllChanges: true })
        onLCP(handleMetric, { reportAllChanges: true })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null // 这是一个监控组件，不需要渲染任何内容
}

// 手动发送自定义性能指标
export function sendCustomMetric(name: string, value: number, labels?: Record<string, string>) {
  const customMetric = {
    name: `custom_${name}`,
    value,
    rating: 'good' as const,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    labels
  }

  sendMetricToAnalytics(customMetric)
}

// 性能监控工具函数
export const PerformanceMonitor = {
  // 测量函数执行时间
  measureFunction: <T extends any[], R>(
    fn: (...args: T) => R,
    name: string
  ) => {
    return (...args: T): R => {
      const start = performance.now()
      const result = fn(...args)
      const duration = performance.now() - start

      sendCustomMetric(`function_${name}`, duration, {
        function_name: name
      })

      return result
    }
  },

  // 测量异步函数执行时间
  measureAsyncFunction: <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    name: string
  ) => {
    return async (...args: T): Promise<R> => {
      const start = performance.now()
      const result = await fn(...args)
      const duration = performance.now() - start

      sendCustomMetric(`async_function_${name}`, duration, {
        function_name: name
      })

      return result
    }
  },

  // 测量组件渲染时间
  measureComponentRender: (componentName: string) => {
    const start = performance.now()

    return () => {
      const duration = performance.now() - start
      sendCustomMetric(`component_render_${componentName}`, duration, {
        component_name: componentName
      })
    }
  },

  // 测量资源加载时间
  measureResourceLoad: (resourceName: string) => {
    const entries = performance.getEntriesByName(resourceName)
    if (entries.length > 0) {
      const entry = entries[0] as PerformanceResourceTiming
      const loadTime = entry.responseEnd - entry.requestStart

      sendCustomMetric(`resource_load_${resourceName}`, loadTime, {
        resource_name: resourceName,
        resource_type: entry.initiatorType
      })
    }
  }
}