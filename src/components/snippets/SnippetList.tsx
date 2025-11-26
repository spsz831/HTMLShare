'use client'

import React from 'react'
import { Snippet } from '@/types/database'
import { useAuth } from '@/components/auth/AuthProvider'
import Link from 'next/link'

interface SnippetListProps {
  snippets: Snippet[]
  loading?: boolean
  onLike?: (id: string) => void
  onFavorite?: (id: string) => void
}

const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  loading = false,
  onLike,
  onFavorite
}) => {
  const { user } = useAuth()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      python: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      css: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      react: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      vue: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      angular: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      node: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      go: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      rust: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      java: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      cpp: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      c: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      php: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      ruby: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      bash: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      sql: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      json: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      yaml: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      markdown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      plaintext: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">暂无代码片段</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          没有找到符合条件的代码片段，试试调整搜索条件或
          <Link href="/create" className="text-blue-600 hover:text-blue-500 mx-1">
            创建一个新的
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="p-6">
            {/* 标题和语言标签 */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Link
                    href={`/snippets/${snippet.id}`}
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {snippet.title}
                  </Link>
                  {snippet.is_featured && (
                    <span className="text-yellow-500 text-sm">⭐</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs">
                      {snippet.profiles?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span>{snippet.profiles?.username || '匿名用户'}</span>
                  </div>
                  <span>•</span>
                  <span>{formatDate(snippet.created_at)}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLanguageColor(snippet.language)}`}>
                {snippet.language}
              </span>
            </div>

            {/* 描述 */}
            {snippet.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {snippet.description}
              </p>
            )}

            {/* 代码预览 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                <code className="line-clamp-3">
                  {snippet.content}
                </code>
              </pre>
            </div>

            {/* 标签 */}
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: tag.color + '20',
                      color: tag.color,
                      border: `1px solid ${tag.color}30`
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* 底部操作栏 */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm">{snippet.view_count}</span>
                </div>

                {user && (
                  <>
                    <button
                      onClick={() => onLike?.(snippet.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        snippet.is_liked
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={snippet.is_liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{snippet.like_count}</span>
                    </button>

                    <button
                      onClick={() => onFavorite?.(snippet.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        snippet.is_favorited
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-600 dark:text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={snippet.is_favorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <Link
                href={`/snippets/${snippet.id}`}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SnippetList