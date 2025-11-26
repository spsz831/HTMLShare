'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

// 导入highlight.js样式
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
  className?: string
  enableMath?: boolean
  enableMermaid?: boolean
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  enableMath = false,
  enableMermaid = false
}) => {
  const [renderedHTML, setRenderedHTML] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // 配置marked选项
  const markedOptions = useMemo(() => {
    return {
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // 支持换行
      pedantic: false,
      smartLists: true,
      smartypants: true, // 智能标点符号
      xhtml: false
    }
  }, [])

  // 渲染Markdown内容
  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        setIsLoading(true)
        let processedContent = content

        // 处理Mermaid图表（如果启用）
        if (enableMermaid) {
          processedContent = await processMermaidDiagrams(processedContent)
        }

        // 处理数学公式（如果启用）
        if (enableMath) {
          processedContent = processMathFormulas(processedContent)
        }

        // 使用marked渲染
        marked.setOptions(markedOptions)
        const rawHTML = await marked(processedContent)

        // 使用DOMPurify清理HTML
        const cleanHTML = DOMPurify.sanitize(rawHTML, {
          ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'div', 'span', 'br', 'hr',
            'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins',
            'pre', 'code',
            'ul', 'ol', 'li',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'blockquote',
            'a', 'img',
            'sup', 'sub',
            'details', 'summary'
          ],
          ALLOWED_ATTR: [
            'href', 'title', 'target', 'rel',
            'src', 'alt', 'width', 'height', 'loading',
            'class', 'id',
            'data-code', 'onclick'
          ],
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
        })

        setRenderedHTML(cleanHTML)
      } catch (error) {
        console.error('Markdown渲染错误:', error)
        setRenderedHTML('<div class="text-red-500 p-4 border border-red-200 rounded-lg">Markdown渲染失败</div>')
      } finally {
        setIsLoading(false)
      }
    }

    renderMarkdown()
  }, [content, markedOptions, enableMath, enableMermaid])

  // 添加复制功能到全局
  useEffect(() => {
    (window as any).copyToClipboard = (button: HTMLElement) => {
      const code = decodeURIComponent(button.getAttribute('data-code') || '')
      navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent
        button.textContent = '✅ 已复制'
        setTimeout(() => {
          button.textContent = originalText
        }, 2000)
      })
    }

    return () => {
      delete (window as any).copyToClipboard
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">渲染中...</span>
      </div>
    )
  }

  return (
    <div className={`markdown-content prose prose-slate dark:prose-invert max-w-none ${className}`}>
      <div
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
      />
    </div>
  )
}

// 处理Mermaid图表（占位符实现）
const processMermaidDiagrams = async (content: string): Promise<string> => {
  // 这里可以集成mermaid.js来渲染图表
  return content.replace(/```mermaid\n([\s\S]*?)\n```/g, (match, diagram) => {
    return `<div class="mermaid-diagram p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800" data-diagram="${encodeURIComponent(diagram)}">
      <div class="flex items-center justify-center text-gray-600 dark:text-gray-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        📊 Mermaid图表: ${diagram.split('\n')[0]}
      </div>
    </div>`
  })
}

// 处理数学公式（占位符实现）
const processMathFormulas = (content: string): string => {
  // 这里可以集成KaTeX或MathJax来渲染数学公式
  return content
    .replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block p-4 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg">$$1$</div>')
    .replace(/\$(.*?)\$/g, '<span class="math-inline px-1 py-0.5 bg-blue-100 dark:bg-blue-800/30 rounded text-sm">$1$</span>')
}

export default MarkdownRenderer