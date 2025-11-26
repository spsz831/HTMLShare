'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// 代码高亮器组件
interface CodeHighlighterProps {
  code: string
  language: string
  theme?: 'dark' | 'light'
  showLineNumbers?: boolean
  className?: string
}

const CodeHighlighter = ({ code, language, theme = 'dark', showLineNumbers = true, className = '' }: CodeHighlighterProps) => {
  const hljs = require('highlight.js')

  let highlightedCode = code
  try {
    highlightedCode = hljs.highlight(code, { language }).value
  } catch (error) {
    console.warn('Syntax highlighting failed:', error)
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`
        rounded-lg overflow-hidden
        ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}
      `}>
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <span className="text-sm text-gray-400 font-mono">{language}</span>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            复制
          </button>
        </div>
        <pre className={`p-4 overflow-x-auto text-sm ${showLineNumbers ? 'pl-12' : ''}`}>
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={`hljs ${theme === 'dark' ? 'hljs-dark' : 'hljs-light'}`}
          />
        </pre>
      </div>
    </div>
  )
}

export default CodeHighlighter