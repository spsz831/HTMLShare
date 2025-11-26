'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Clock, ExternalLink, Code2 } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import RetryableError, { useRetry } from '@/components/RetryableError'
import { performanceMonitor, usePerfMeasure } from '@/lib/performance'
import { errorTracker } from '@/lib/errorTracking'

interface RecentSnippet {
  id: string
  title: string
  language: string
  content: string
  created_at: string
  is_public: boolean
}

export default function RecentPage() {
  const [snippets, setSnippets] = useState<RecentSnippet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 性能监控
  usePerfMeasure('RecentPage')

  // 页面加载性能记录
  useEffect(() => {
    performanceMonitor.recordPageLoad('recent')
  }, [])

  // 获取最近代码片段的核心逻辑
  const fetchRecentSnippetsRequest = async () => {
    const response = await fetch('/api/snippets?page=1&limit=20', {
      headers: { 'Cache-Control': 'no-cache' }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || '服务器返回数据格式错误')
    }

    return data.data || []
  }

  const { retry, isRetrying } = useRetry(fetchRecentSnippetsRequest, 3, 1500)

  const fetchRecentSnippets = useCallback(async () => {
    const startTime = performance.now()
    setLoading(true)
    setError(null)

    try {
      const snippetsData = await retry()
      setSnippets(snippetsData)

      // 记录用户操作性能
      const duration = performance.now() - startTime
      performanceMonitor.recordUserInteraction('fetch_recent_snippets', duration)

    } catch (error) {
      console.error('获取最近代码片段失败:', error)

      let errorMessage = '加载失败，请重试'
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = '网络连接失败，请检查网络连接'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      errorTracker.reportUserActionError('fetch_recent_snippets', error as Error, {
        page: 'recent'
      })

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [retry])

  const handleRetryFetch = async () => {
    setError(null)
    await fetchRecentSnippets()
  }

  useEffect(() => {
    fetchRecentSnippets()
  }, [fetchRecentSnippets])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays}天前`
    } else if (diffHours > 0) {
      return `${diffHours}小时前`
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return diffMinutes > 0 ? `${diffMinutes}分钟前` : '刚刚'
    }
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-100 text-yellow-800',
      typescript: 'bg-blue-100 text-blue-800',
      python: 'bg-green-100 text-green-800',
      html: 'bg-orange-100 text-orange-800',
      css: 'bg-purple-100 text-purple-800',
      json: 'bg-gray-100 text-gray-800',
      markdown: 'bg-indigo-100 text-indigo-800',
      default: 'bg-gray-100 text-gray-800'
    }
    return colors[language] || colors.default
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner
          size="lg"
          text={isRetrying ? '重试加载中...' : '加载最近代码片段...'}
          className="text-blue-600"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  HTMLShare
                </h1>
              </Link>
              <div className="hidden sm:block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                BETA
              </div>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Clock className="w-10 h-10 text-blue-600" />
            最近分享的代码
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            查看社区最近分享的代码片段，获取灵感
          </p>
        </div>

        {/* Error Message with Retry */}
        {error && (
          <RetryableError
            error={error}
            onRetry={handleRetryFetch}
            className="mb-8"
            showErrorDetails={process.env.NODE_ENV === 'development'}
          />
        )}

        {/* Snippets List */}
        {snippets.length === 0 && !error ? (
          <div className="text-center py-16">
            <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">暂无代码片段</h3>
            <p className="text-gray-500 mb-6">成为第一个分享代码的用户吧！</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <Code2 className="w-4 h-4" />
              开始分享代码
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {snippet.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(snippet.language)}`}>
                          {snippet.language.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(snippet.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap">
                      {truncateContent(snippet.content)}
                    </pre>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      公开分享
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/snippet/${snippet.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Code2 className="w-4 h-4" />
                        查看代码
                      </Link>
                      {snippet.language.toLowerCase() === 'html' && (
                        <Link
                          href={`/snippet/${snippet.id}/view`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          预览页面
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (for future implementation) */}
        {snippets.length >= 20 && (
          <div className="text-center mt-12">
            <button
              className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              disabled
            >
              加载更多 (即将推出)
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-sm text-gray-400">
        <p>HTMLShare - 企业级代码分享平台 | Next.js + Supabase + TypeScript</p>
      </footer>
    </div>
  )
}