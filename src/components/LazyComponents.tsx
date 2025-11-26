'use client'

import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

// 懒加载组件
const MonacoEditor = dynamic(
  () => import('@/components/ui/MonacoEditor'),
  {
    loading: () => (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-400">加载编辑器...</span>
        </div>
      </div>
    ),
    ssr: false
  }
)

const MarkdownRenderer = dynamic(
  () => import('@/components/ui/MarkdownRenderer'),
  {
    loading: () => (
      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-gray-500">加载预览...</div>
      </div>
    ),
    ssr: false
  }
)

const SearchBar = dynamic(
  () => import('@/components/search/SearchBar'),
  {
    loading: () => (
      <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
    )
  }
)

const SnippetList = dynamic(
  () => import('@/components/snippets/SnippetList'),
  {
    loading: () => (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }
)

// 代码高亮器懒加载
const CodeHighlighter = dynamic(
  () => import('@/components/ui/CodeHighlighter'),
  {
    loading: () => <div className="bg-gray-800 rounded-lg h-64 animate-pulse"></div>,
    ssr: false
  }
)

// 图表组件懒加载
const MermaidRenderer = dynamic(
  () => import('@/components/ui/MermaidRenderer'),
  {
    loading: () => <div className="bg-gray-100 rounded-lg h-48 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">加载图表...</span>
    </div>,
    ssr: false
  }
)

export {
  MonacoEditor,
  MarkdownRenderer,
  SearchBar,
  SnippetList,
  CodeHighlighter,
  MermaidRenderer
}

// 预加载关键组件
export const preloadComponents = () => {
  // 预加载 Monaco 编辑器
  import('@/components/ui/MonacoEditor')
  // 预加载 Markdown 渲染器
  import('@/components/ui/MarkdownRenderer')
}