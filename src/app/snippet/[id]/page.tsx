'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Eye, Code2, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface Snippet {
  id: string
  title: string
  content: string
  language: string
  description: string | null
  view_count: number
  created_at: string
}

export default function SnippetPage() {
  const params = useParams()
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')
  const [viewMode, setViewMode] = useState<'rendered' | 'code'>('rendered')
  const [renderedContent, setRenderedContent] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchSnippet(params.id as string)
    }
  }, [params.id])

  useEffect(() => {
    const processContent = async () => {
      if (snippet && snippet.content) {
        // 高亮代码
        try {
          const highlighted = hljs.highlightAuto(snippet.content, [snippet.language]).value
          setHighlightedCode(highlighted)
        } catch (error) {
          setHighlightedCode(snippet.content)
        }

        // 渲染内容
        await renderContent(snippet.content, snippet.language)
      }
    }

    processContent()
  }, [snippet])

  const renderContent = async (content: string, language: string) => {
    try {
      switch (language.toLowerCase()) {
        case 'html':
          // 增强HTML渲染，添加完整的HTML文档结构和现代CSS框架
          let enhancedHtml = content;

          // 如果不是完整的HTML文档，包装成完整文档
          if (!content.toLowerCase().includes('<!doctype') && !content.toLowerCase().includes('<html')) {
            enhancedHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMLShare Preview</title>

    <!-- Modern CSS Reset -->
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        /* 注意：不重置body样式，保留用户的背景和布局设置 */
        img { max-width: 100%; height: auto; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>

    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUa+IgAdbYQFnX1ZnlG2xCBCl8VxM9A5xDf+VqhR+Fn0gx6r8p+DGGlQEG6d" crossorigin="anonymous">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@400;500;700;900&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">

    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer">
</head>
<body>
    ${content}

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

    <!-- jQuery (if needed) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</body>
</html>`;
          } else {
            // 如果是完整HTML，检查是否需要注入框架
            enhancedHtml = content;

            // 只在没有相关框架时才注入
            if (!content.includes('tailwindcss.com') && !content.includes('bootstrap')) {
              enhancedHtml = content
                .replace(/<head>/i, `<head>
    <!-- HTMLShare Enhanced Rendering -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">`)
            }
          }

          // 保留原始HTML不做过滤
          setRenderedContent(enhancedHtml)
          break

        case 'markdown':
          const htmlFromMarkdown = await marked(content)
          const sanitizedMarkdown = DOMPurify.sanitize(htmlFromMarkdown)
          setRenderedContent(sanitizedMarkdown)
          break

        case 'css':
          setRenderedContent(`
            <div style="font-family: 'Arial', sans-serif; padding: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">CSS 样式预览:</h3>
              <style>${content}</style>
              <div class="demo-container" style="border: 1px solid #ddd; padding: 20px; background: white;">
                <div class="demo-element" style="width: 100px; height: 100px; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); border: 1px solid #ccc;">
                  <p style="margin: 10px 0;">示例元素</p>
                  <button style="padding: 5px 10px;">按钮</button>
                </div>
              </div>
            </div>
          `)
          break

        case 'javascript':
        case 'typescript':
          setRenderedContent(`
            <div style="font-family: 'Arial', sans-serif; padding: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">JavaScript 代码预览:</h3>
              <div style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px;">
                <p style="margin: 0 0 10px 0; color: #666;">⚠️ 出于安全考虑，JavaScript 代码不会自动执行</p>
                <p style="margin: 0; color: #666;">请切换到代码视图查看源码</p>
              </div>
            </div>
          `)
          break

        case 'json':
          try {
            const jsonObj = JSON.parse(content)
            const prettified = JSON.stringify(jsonObj, null, 2)
            setRenderedContent(`
              <div style="font-family: 'Arial', sans-serif; padding: 20px;">
                <h3 style="color: #333; margin-bottom: 15px;">JSON 格式化预览:</h3>
                <pre style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: 'Monaco', 'Courier New', monospace;">${prettified}</pre>
              </div>
            `)
          } catch {
            setRenderedContent(`
              <div style="font-family: 'Arial', sans-serif; padding: 20px;">
                <h3 style="color: #d32f2f;">JSON 格式错误</h3>
                <p>无法解析 JSON 内容，请检查语法是否正确</p>
              </div>
            `)
          }
          break

        default:
          setRenderedContent(`
            <div style="font-family: 'Arial', sans-serif; padding: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">${language.toUpperCase()} 内容预览:</h3>
              <pre style="background: #f8f9fa; border: 1px solid #e9ecef; padding: 15px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; font-family: 'Monaco', 'Courier New', monospace;">${content}</pre>
            </div>
          `)
      }
    } catch (error) {
      setRenderedContent('<div style="color: red;">渲染出错</div>')
    }
  }

  const fetchSnippet = async (id: string) => {
    try {
      const response = await fetch(`/api/snippets/${id}`)
      if (response.ok) {
        const data = await response.json()
        setSnippet(data.snippet)
      } else {
        setError('代码片段未找到')
      }
    } catch (error) {
      setError('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (snippet) {
      await navigator.clipboard.writeText(snippet.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">代码片段未找到</h1>
          <p className="text-gray-600 mb-8">{error || '该代码片段可能已被删除或不存在'}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Snippet Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getLanguageColor(snippet.language)}`}>
                  {snippet.language}
                </span>

                {/* 视图切换按钮 */}
                <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('rendered')}
                    className={`flex items-center gap-1 px-3 py-1 text-sm transition-colors ${
                      viewMode === 'rendered'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    渲染
                  </button>
                  <button
                    onClick={() => setViewMode('code')}
                    className={`flex items-center gap-1 px-3 py-1 text-sm transition-colors ${
                      viewMode === 'code'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    代码
                  </button>
                </div>

                {/* 纯渲染按钮 - 仅HTML显示 */}
                {snippet.language.toLowerCase() === 'html' && (
                  <a
                    href={`/snippet/${snippet.id}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    纯渲染
                  </a>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '已复制' : '复制代码'}</span>
              </button>
            </div>
          </div>

          {/* Content Display */}
          <div className="p-6">
            {viewMode === 'rendered' ? (
              // 渲染视图
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {snippet.language.toLowerCase() === 'html' ? (
                  <iframe
                    srcDoc={renderedContent}
                    className="w-full min-h-[600px] border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation-by-user-activation"
                    title="HTML Preview"
                    loading="eager"
                  />
                ) : (
                  <div
                    className="min-h-[400px] overflow-auto p-4 bg-white"
                    dangerouslySetInnerHTML={{ __html: renderedContent }}
                    style={{ fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif" }}
                  />
                )}
              </div>
            ) : (
              // 代码视图
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{ __html: highlightedCode || snippet.content }}
                  className={`language-${snippet.language}`}
                />
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}