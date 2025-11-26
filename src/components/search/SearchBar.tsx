'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { SearchFilters, LanguageType } from '@/types/database'

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void
  loading?: boolean
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  className = ''
}) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    language: undefined,
    sort_by: 'created_at',
    sort_order: 'desc'
  })
  const [showFilters, setShowFilters] = useState(false)

  const languages: { value: LanguageType | undefined; label: string }[] = [
    { value: undefined, label: '全部语言' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node.js' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'bash', label: 'Bash' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'plaintext', label: 'Plain Text' }
  ]

  const sortOptions = [
    { value: 'created_at', label: '创建时间' },
    { value: 'updated_at', label: '更新时间' },
    { value: 'view_count', label: '查看次数' },
    { value: 'like_count', label: '点赞数量' }
  ]

  const handleSearch = useCallback(() => {
    onSearch(query, filters)
  }, [query, filters, onSearch])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    // 自动执行搜索
    onSearch(query, newFilters)
  }

  useEffect(() => {
    // 初始加载时执行一次搜索
    handleSearch()
  }, [handleSearch])

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {/* 主搜索栏 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="搜索代码片段、标题、描述..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            搜索
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            筛选
          </button>
        </div>
      </div>

      {/* 筛选选项 */}
      {showFilters && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                编程语言
              </label>
              <select
                value={filters.language || ''}
                onChange={(e) => updateFilter('language', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {languages.map(lang => (
                  <option key={lang.value || 'all'} value={lang.value || ''}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                排序方式
              </label>
              <select
                value={filters.sort_by || 'created_at'}
                onChange={(e) => updateFilter('sort_by', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                排序顺序
              </label>
              <select
                value={filters.sort_order || 'desc'}
                onChange={(e) => updateFilter('sort_order', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="desc">降序</option>
                <option value="asc">升序</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.is_featured || false}
                  onChange={(e) => updateFilter('is_featured', e.target.checked || undefined)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  仅显示精选
                </span>
              </label>
            </div>
          </div>

          {/* 快速筛选按钮 */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setFilters({
                    sort_by: 'created_at',
                    sort_order: 'desc'
                  })
                  onSearch(query, { sort_by: 'created_at', sort_order: 'desc' })
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
              >
                最新发布
              </button>
              <button
                onClick={() => {
                  setFilters({
                    sort_by: 'like_count',
                    sort_order: 'desc'
                  })
                  onSearch(query, { sort_by: 'like_count', sort_order: 'desc' })
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
              >
                最受欢迎
              </button>
              <button
                onClick={() => {
                  setFilters({
                    sort_by: 'view_count',
                    sort_order: 'desc'
                  })
                  onSearch(query, { sort_by: 'view_count', sort_order: 'desc' })
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
              >
                最多查看
              </button>
              <button
                onClick={() => {
                  setFilters({
                    is_featured: true,
                    sort_by: 'created_at',
                    sort_order: 'desc'
                  })
                  onSearch(query, { is_featured: true, sort_by: 'created_at', sort_order: 'desc' })
                }}
                className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40 text-yellow-800 dark:text-yellow-300 rounded-full transition-colors"
              >
                ⭐ 精选内容
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar