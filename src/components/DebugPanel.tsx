'use client'

import React, { useState, useEffect } from 'react'
import { performanceMonitor } from '@/lib/performance'
import { errorTracker } from '@/lib/errorTracking'

interface DebugPanelProps {
  isVisible?: boolean
  onClose?: () => void
}

export default function DebugPanel({ isVisible = false, onClose }: DebugPanelProps) {
  const [activeTab, setActiveTab] = useState<'performance' | 'errors' | 'network' | 'console'>('performance')
  const [performanceData, setPerformanceData] = useState<any>(null)
  const [errorStats, setErrorStats] = useState<any>(null)
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: string, message: string, timestamp: number }>>([])

  useEffect(() => {
    if (isVisible) {
      // 获取性能数据
      setPerformanceData(performanceMonitor.getPerformanceSnapshot())
      setErrorStats(errorTracker.getErrorStats())

      // 监听新错误
      errorTracker.onError(() => {
        setErrorStats(errorTracker.getErrorStats())
      })
    }
  }, [isVisible])

  useEffect(() => {
    // 拦截console方法
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    }

    const interceptConsole = (type: string, originalMethod: Function) => {
      return (...args: any[]) => {
        originalMethod.apply(console, args)
        setConsoleLogs(prev => [
          ...prev.slice(-49),
          {
            type,
            message: args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' '),
            timestamp: Date.now()
          }
        ])
      }
    }

    if (isVisible) {
      console.log = interceptConsole('log', originalConsole.log)
      console.error = interceptConsole('error', originalConsole.error)
      console.warn = interceptConsole('warn', originalConsole.warn)
      console.info = interceptConsole('info', originalConsole.info)
    }

    return () => {
      if (isVisible) {
        console.log = originalConsole.log
        console.error = originalConsole.error
        console.warn = originalConsole.warn
        console.info = originalConsole.info
      }
    }
  }, [isVisible])

  if (!isVisible) return null

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50 font-mono text-xs overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <h3 className="font-semibold text-gray-800">🛠️ Debug Panel</h3>
        <div className="flex gap-1">
          <button
            onClick={() => {
              performanceMonitor.recordCustomMetric('debug_panel_refresh', performance.now())
              setPerformanceData(performanceMonitor.getPerformanceSnapshot())
              setErrorStats(errorTracker.getErrorStats())
            }}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔄
          </button>
          <button
            onClick={() => {
              setConsoleLogs([])
              errorTracker.cleanup()
              setErrorStats(errorTracker.getErrorStats())
            }}
            className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            🧹
          </button>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { id: 'performance', label: '📊 性能', count: null },
          { id: 'errors', label: '🚨 错误', count: errorStats?.total || 0 },
          { id: 'network', label: '🌐 网络', count: null },
          { id: 'console', label: '💬 控制台', count: consoleLogs.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 p-2 text-xs ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="ml-1 px-1 bg-red-500 text-white rounded-full text-xs">
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-2 h-60 overflow-auto">
        {activeTab === 'performance' && (
          <div className="space-y-2">
            <div className="text-gray-600 font-semibold">页面加载时间</div>
            {performanceData && (
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>DOM加载: {performanceData.timing.domContentLoadedEventEnd - performanceData.timing.navigationStart}ms</div>
                <div>完全加载: {performanceData.timing.loadEventEnd - performanceData.timing.navigationStart}ms</div>
                <div>首字节: {performanceData.timing.responseStart - performanceData.timing.navigationStart}ms</div>
                <div>DOM完成: {performanceData.timing.domComplete - performanceData.timing.navigationStart}ms</div>
              </div>
            )}

            {performanceData?.memory && (
              <>
                <div className="text-gray-600 font-semibold mt-3">内存使用</div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div>已用: {formatBytes(performanceData.memory.usedJSHeapSize)}</div>
                  <div>总计: {formatBytes(performanceData.memory.totalJSHeapSize)}</div>
                  <div>限制: {formatBytes(performanceData.memory.jsHeapSizeLimit)}</div>
                </div>
              </>
            )}

            {performanceData?.connection && (
              <>
                <div className="text-gray-600 font-semibold mt-3">网络连接</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>类型: {performanceData.connection.effectiveType}</div>
                  <div>下行: {performanceData.connection.downlink}Mbps</div>
                  <div>RTT: {performanceData.connection.rtt}ms</div>
                </div>
              </>
            )}

            <button
              onClick={() => {
                console.log('Page loaded:', performance.now())
                performanceMonitor.recordPageLoad('debug_panel')
              }}
              className="w-full mt-3 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
            >
              记录当前页面性能
            </button>
          </div>
        )}

        {activeTab === 'errors' && (
          <div className="space-y-2">
            {errorStats && (
              <>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>总错误数: {errorStats.total}</div>
                  <div>最近1小时: {errorStats.lastHour}</div>
                </div>

                <div className="text-gray-600 font-semibold">按严重程度</div>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <div className="text-red-600">严重: {errorStats.bySeverity.critical || 0}</div>
                  <div className="text-orange-600">高: {errorStats.bySeverity.high || 0}</div>
                  <div className="text-yellow-600">中: {errorStats.bySeverity.medium || 0}</div>
                  <div className="text-gray-600">低: {errorStats.bySeverity.low || 0}</div>
                </div>

                <div className="text-gray-600 font-semibold">按类别</div>
                <div className="space-y-1 text-xs">
                  {Object.entries(errorStats.byCategory).map(([category, count]) => (
                    <div key={category} className="flex justify-between">
                      <span>{category}:</span>
                      <span>{count as number}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="space-y-1">
              <button
                onClick={() => errorTracker.reportError('测试错误', { type: 'manual_test' })}
                className="w-full px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                触发测试错误
              </button>
              <button
                onClick={() => {
                  try {
                    throw new Error('测试组件错误')
                  } catch (e) {
                    errorTracker.reportComponentError('DebugPanel', e as Error)
                  }
                }}
                className="w-full px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
              >
                触发组件错误
              </button>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-2">
            <div className="text-gray-600 font-semibold">网络请求监控</div>
            <div className="text-xs text-gray-500">
              在浏览器开发者工具的网络面板中查看详细信息
            </div>
            <button
              onClick={() => {
                const testApiCall = async () => {
                  const start = performance.now()
                  try {
                    const response = await fetch('/api/health-check')
                    const duration = performance.now() - start
                    performanceMonitor.recordApiCall('/api/health-check', duration, response.ok, response.status)
                  } catch (error) {
                    const duration = performance.now() - start
                    performanceMonitor.recordApiCall('/api/health-check', duration, false)
                    errorTracker.reportApiError('/api/health-check', 0, error)
                  }
                }
                testApiCall()
              }}
              className="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              测试API调用
            </button>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 font-semibold">控制台日志</div>
              <button
                onClick={() => setConsoleLogs([])}
                className="px-1 py-0.5 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
              >
                清除
              </button>
            </div>
            <div className="space-y-0.5 max-h-44 overflow-auto">
              {consoleLogs.map((log, index) => (
                <div key={index} className="text-xs border-b border-gray-100 pb-1">
                  <div className="flex justify-between text-gray-500">
                    <span className={
                      log.type === 'error' ? 'text-red-600' :
                      log.type === 'warn' ? 'text-orange-600' :
                      log.type === 'info' ? 'text-blue-600' : 'text-gray-600'
                    }>
                      {log.type.toUpperCase()}
                    </span>
                    <span>{formatTime(log.timestamp)}</span>
                  </div>
                  <div className="break-words">{log.message}</div>
                </div>
              ))}
              {consoleLogs.length === 0 && (
                <div className="text-gray-500 text-center py-4">暂无日志</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 快捷键控制组件
export function DebugController() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + D
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault()
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  // 开发环境显示按钮
  if (process.env.NODE_ENV === 'production') {
    return <DebugPanel isVisible={isVisible} onClose={() => setIsVisible(false)} />
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 w-8 h-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 z-40 text-xs font-mono"
        title="打开调试面板 (Ctrl+Shift+D)"
      >
        🛠️
      </button>
      <DebugPanel isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  )
}