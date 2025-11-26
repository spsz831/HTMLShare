'use client'

import { useEffect, useState } from 'react'
import { Activity, Clock, Zap, AlertTriangle, TrendingUp, Database } from 'lucide-react'

interface MetricData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
}

interface PerformanceMetrics {
  webVitals: {
    CLS?: MetricData
    FID?: MetricData
    FCP?: MetricData
    LCP?: MetricData
    TTFB?: MetricData
  }
  system: {
    responseTime: number
    errorRate: number
    cacheHitRate: number
    activeConnections: number
  }
}

const MetricCard = ({ title, value, unit, rating, icon: Icon, trend }: {
  title: string
  value: number | string
  unit?: string
  rating?: 'good' | 'needs-improvement' | 'poor'
  icon: React.ElementType
  trend?: number
}) => {
  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className={`p-6 rounded-lg border ${getRatingColor(rating)}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {typeof value === 'number' ? value.toFixed(1) : value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% vs 昨天
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 opacity-50" />
      </div>
    </div>
  )
}

const HistoryChart = ({ data, title, color = 'blue' }: {
  data: Array<{ value: number; timestamp: number }>
  title: string
  color?: string
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative h-32">
        <svg className="w-full h-full">
          <polyline
            fill="none"
            stroke={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - ((point.value - minValue) / range) * 100
              return `${x},${y}`
            }).join(' ')}
          />
        </svg>
        <div className="absolute bottom-0 left-0 text-xs text-gray-500">
          {minValue.toFixed(1)}
        </div>
        <div className="absolute top-0 right-0 text-xs text-gray-500">
          {maxValue.toFixed(1)}
        </div>
      </div>
    </div>
  )
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    webVitals: {},
    system: {
      responseTime: 0,
      errorRate: 0,
      cacheHitRate: 0,
      activeConnections: 0
    }
  })

  const [historyData, setHistoryData] = useState<{
    [key: string]: Array<{ value: number; timestamp: number }>
  }>({})

  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // 获取性能指标
  const fetchMetrics = async () => {
    try {
      // 获取 Web Vitals 数据
      const webVitalsResponse = await fetch('/api/analytics/web-vitals')
      const webVitalsData = await webVitalsResponse.json()

      // 获取系统指标
      const systemResponse = await fetch('/api/analytics/system')
      const systemData = await systemResponse.json()

      setMetrics({
        webVitals: webVitalsData.summary || {},
        system: systemData || {
          responseTime: 0,
          errorRate: 0,
          cacheHitRate: 0,
          activeConnections: 0
        }
      })

      // 获取历史数据
      const historyResponse = await fetch('/api/analytics/history')
      const historyData = await historyResponse.json()
      setHistoryData(historyData)

      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()

    // 每30秒刷新一次
    const interval = setInterval(fetchMetrics, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 标题和刷新信息 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">性能监控仪表板</h1>
            <div className="text-sm text-gray-500">
              最后更新: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
          <p className="text-gray-600 mt-2">实时监控应用性能指标和用户体验</p>
        </div>

        {/* Web Vitals 指标 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Core Web Vitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <MetricCard
              title="LCP (最大内容绘制)"
              value={metrics.webVitals.LCP?.value || 0}
              unit="ms"
              rating={metrics.webVitals.LCP?.rating}
              icon={Clock}
            />
            <MetricCard
              title="FID (首次输入延迟)"
              value={metrics.webVitals.FID?.value || 0}
              unit="ms"
              rating={metrics.webVitals.FID?.rating}
              icon={Zap}
            />
            <MetricCard
              title="CLS (累积布局偏移)"
              value={metrics.webVitals.CLS?.value || 0}
              rating={metrics.webVitals.CLS?.rating}
              icon={Activity}
            />
            <MetricCard
              title="FCP (首次内容绘制)"
              value={metrics.webVitals.FCP?.value || 0}
              unit="ms"
              rating={metrics.webVitals.FCP?.rating}
              icon={TrendingUp}
            />
            <MetricCard
              title="TTFB (首字节时间)"
              value={metrics.webVitals.TTFB?.value || 0}
              unit="ms"
              rating={metrics.webVitals.TTFB?.rating}
              icon={Database}
            />
          </div>
        </div>

        {/* 系统指标 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">系统指标</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="平均响应时间"
              value={metrics.system.responseTime}
              unit="ms"
              rating={metrics.system.responseTime < 200 ? 'good' : metrics.system.responseTime < 500 ? 'needs-improvement' : 'poor'}
              icon={Clock}
            />
            <MetricCard
              title="错误率"
              value={metrics.system.errorRate}
              unit="%"
              rating={metrics.system.errorRate < 1 ? 'good' : metrics.system.errorRate < 5 ? 'needs-improvement' : 'poor'}
              icon={AlertTriangle}
            />
            <MetricCard
              title="缓存命中率"
              value={metrics.system.cacheHitRate}
              unit="%"
              rating={metrics.system.cacheHitRate > 80 ? 'good' : metrics.system.cacheHitRate > 60 ? 'needs-improvement' : 'poor'}
              icon={Database}
            />
            <MetricCard
              title="活跃连接数"
              value={metrics.system.activeConnections}
              rating={metrics.system.activeConnections < 100 ? 'good' : metrics.system.activeConnections < 500 ? 'needs-improvement' : 'poor'}
              icon={Activity}
            />
          </div>
        </div>

        {/* 历史趋势图表 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">性能趋势</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {historyData.LCP && (
              <HistoryChart
                data={historyData.LCP}
                title="LCP 趋势"
                color="blue"
              />
            )}
            {historyData.FID && (
              <HistoryChart
                data={historyData.FID}
                title="FID 趋势"
                color="green"
              />
            )}
            {historyData.responseTime && (
              <HistoryChart
                data={historyData.responseTime}
                title="响应时间趋势"
                color="purple"
              />
            )}
            {historyData.errorRate && (
              <HistoryChart
                data={historyData.errorRate}
                title="错误率趋势"
                color="red"
              />
            )}
          </div>
        </div>

        {/* 快速操作 */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">快速操作</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              刷新数据
            </button>
            <button
              onClick={() => fetchMetrics()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              立即更新
            </button>
            <a
              href="/api/analytics/export"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              导出报告
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}