'use client'

import { useState } from 'react'
import { Upload, Trash2, Link as LinkIcon, Copy, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

type Language = 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json' | 'markdown' | 'plaintext'

const languages: { value: Language; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: '纯文本' }
]

export default function Home() {
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState<Language>('javascript')
  const [isCreating, setIsCreating] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  // 智能检测代码语言
  const detectLanguage = (code: string): Language => {
    if (!code.trim()) return 'plaintext'

    const cleanCode = code.trim()

    // HTML 检测 - 优先级最高（更精确的检测）
    if (
        // 完整HTML文档特征 - 最优先
        cleanCode.includes('<!DOCTYPE') ||
        /^<\s*!doctype\s+html/i.test(cleanCode) ||
        /<html[^>]*>[\s\S]*<\/html>/i.test(cleanCode) ||

        // 基本 HTML 结构组合 - 严格检测
        (cleanCode.includes('<html') && (cleanCode.includes('<head>') || cleanCode.includes('<body>'))) ||
        (cleanCode.includes('<head>') && cleanCode.includes('<body>')) ||
        (cleanCode.includes('<meta') && cleanCode.includes('<title>')) ||

        // 具有明显HTML特征的组合
        (cleanCode.includes('<style') && cleanCode.includes('<body>')) ||
        (cleanCode.includes('<script') && cleanCode.includes('<body>')) ||
        (cleanCode.includes('<div') && cleanCode.includes('<head>')) ||

        // 具有多个HTML元素的结构化文档
        (
            (
                cleanCode.includes('<div') || cleanCode.includes('<section') ||
                cleanCode.includes('<article') || cleanCode.includes('<main') ||
                cleanCode.includes('<header') || cleanCode.includes('<footer')
            ) &&
            (
                cleanCode.includes('<h1') || cleanCode.includes('<h2') || cleanCode.includes('<h3') ||
                cleanCode.includes('<p>') || cleanCode.includes('<ul>') || cleanCode.includes('<ol>') ||
                cleanCode.includes('<nav') || cleanCode.includes('<aside')
            )
        )
    ) {
      return 'html'
    }

    // JSON 检测 - 提升到第2位（严格格式，误判率最低）
    if ((cleanCode.startsWith('{') && cleanCode.endsWith('}')) ||
        (cleanCode.startsWith('[') && cleanCode.endsWith(']'))) {
      try {
        JSON.parse(cleanCode)
        return 'json'
      } catch {
        // JSON解析失败，继续其他检测
      }
    }

    // Markdown 检测 - 在CSS之前，但在HTML和JSON之后
    if ((cleanCode.includes('# ') || cleanCode.includes('## ') || cleanCode.includes('### ')) ||
        cleanCode.includes('```') ||
        (cleanCode.includes('**') && cleanCode.split('**').length >= 3) || // 粗体成对检测
        cleanCode.includes('[]()') || cleanCode.includes('](') ||
        /^\s*[-*+]\s+/.test(cleanCode) || /^\s*\d+\.\s+/.test(cleanCode) ||
        /^>\s+/.test(cleanCode) || // 引用块检测
        /^---+$/.test(cleanCode.split('\n')[0]) || // 分隔线（单独一行）
        /^#{1,6}\s+/.test(cleanCode) || // 标题检测
        cleanCode.includes('![') || // 图片链接
        /\|.*\|.*\|/.test(cleanCode)) { // 表格检测（至少两个管道符）
      return 'markdown'
    }

    // JavaScript 检测 - 提升到第3位（高使用频率，现代特征检测）
    if (
        // 现代JS特征
        /^\s*(import|export)\s+/.test(cleanCode) ||
        cleanCode.includes('=>') ||
        cleanCode.includes('const ') || cleanCode.includes('let ') ||

        // ES6+ 特征
        cleanCode.includes('async ') || cleanCode.includes('await ') ||
        /`[^`]*\$\{[^}]*\}[^`]*`/.test(cleanCode) || // 模板字符串
        /const\s+\{[^}]+\}\s*=/.test(cleanCode) || // 解构赋值

        // 经典JS特征
        cleanCode.includes('function') || cleanCode.includes('var ') ||
        cleanCode.includes('console.log') || cleanCode.includes('document.') ||
        cleanCode.includes('window.') || /class\s+\w+\s*\{/.test(cleanCode) ||

        // JSX检测（React）
        (/return\s*\([\s\S]*<[A-Z]/.test(cleanCode) && cleanCode.includes('>')) ||

        // 现代框架特征
        cleanCode.includes('.map(') || cleanCode.includes('.filter(') ||
        cleanCode.includes('useState') || cleanCode.includes('useEffect')
    ) {
      return 'javascript'
    }

    // CSS 检测 - 更严格的检测条件，避免误判markdown
    if ((cleanCode.includes(':root') && cleanCode.includes('{')) ||
        (cleanCode.includes('--') && cleanCode.includes(':') && cleanCode.includes('{')) ||
        (/\/\*.*\*\//.test(cleanCode) && cleanCode.includes('{') && cleanCode.includes(':')) ||
        cleanCode.includes('@media') || cleanCode.includes('@import') || cleanCode.includes('@keyframes') ||
        /^\s*[.#]\w+[\w\-]*\s*\{/.test(cleanCode) ||
        /\.\w+[\w\-]*\s*\{/.test(cleanCode) ||
        (/#\w+[\w\-]*\s*\{/.test(cleanCode)) ||
        (/\w+\s*\{\s*(color|background|margin|padding|display|border|font):/.test(cleanCode)) ||
        // 更严格：必须同时包含属性和大括号
        ((cleanCode.includes('background:') || cleanCode.includes('margin:') || cleanCode.includes('padding:') ||
         cleanCode.includes('display:') || cleanCode.includes('border:') || cleanCode.includes('color:')) &&
         cleanCode.includes('{') && cleanCode.includes('}'))) {
      return 'css'
    }

    // TypeScript 检测 - 优化版本（在JavaScript之后，避免误判）
    if (
        // TS特有类型声明
        (cleanCode.includes('interface ') || cleanCode.includes('type ') ||
         cleanCode.includes(': string') || cleanCode.includes(': number') ||
         cleanCode.includes(': boolean') || cleanCode.includes(': void') ||
         cleanCode.includes('export type') || cleanCode.includes('import type')) &&

        // 必须包含代码逻辑
        (cleanCode.includes('function') || cleanCode.includes('const') ||
         cleanCode.includes('let') || cleanCode.includes('=>') ||
         cleanCode.includes('class')) &&

        // 排除纯TS定义文件
        !/^\s*(interface|type)\s+\w+/.test(cleanCode)
    ) {
      return 'typescript'
    }

    // Python 检测
    if (cleanCode.includes('def ') || cleanCode.includes('import ') || cleanCode.includes('from ') ||
        cleanCode.includes('print(') || cleanCode.includes('if __name__') ||
        /^\s*(class|for|while|if)\s+/.test(cleanCode) || cleanCode.includes('elif ') ||
        /^\s*#.*python/i.test(cleanCode) || cleanCode.includes('self.')) {
      return 'python'
    }

    return 'plaintext'
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    if (newContent.trim()) {
      const detectedLanguage = detectLanguage(newContent)
      setLanguage(detectedLanguage)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        handleContentChange(text)
      }
      reader.readAsText(file)
    }
  }

  const handleClear = () => {
    setContent('')
    setShareUrl('')
    setCopied(false)
  }

  const handleCreateSnippet = async () => {
    if (!content.trim()) return

    setIsCreating(true)
    try {
      // 调用API创建代码片段
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          language: language,
          title: `${language} 代码片段`,
          is_public: true
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '创建失败')
      }

      const { snippet } = await response.json()

      // 生成真实的分享链接
      const isHtml = language.toLowerCase() === 'html'
      const url = isHtml
        ? `${window.location.origin}/snippet/${snippet.id}/view`
        : `${window.location.origin}/snippet/${snippet.id}`
      setShareUrl(url)

    } catch (error) {
      console.error('创建代码片段失败:', error)
      alert(error instanceof Error ? error.message : '网络错误，请重试')
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopy = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('复制失败:', error)
      }
    }
  }

  const handleOpenInNewWindow = () => {
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HTMLShare
              </h1>
              <div className="hidden sm:block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                BETA
              </div>
            </div>
            <div className="text-sm text-gray-500">
              快速代码分享平台
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            分享您的代码片段
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            粘贴代码，智能识别语言，一键生成永久分享链接
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
          {/* Code Input */}
          <div className="p-8 relative">
            {/* 右上角语言标签 */}
            {content.trim() && (
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 text-sm font-medium rounded-full shadow-lg ${getLanguageColor(language)}`}>
                  {languages.find(lang => lang.value === language)?.label || language}
                </span>
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="请粘贴您的代码..."
              className="w-full h-[28rem] p-6 font-mono text-sm bg-gray-50/70 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-8 py-6 border-t border-gray-200/50">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-4">
                <label className="flex items-center gap-3 px-5 py-3 bg-white/80 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md cursor-pointer transition-all duration-200 group">
                  <Upload className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">上传文件</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".js,.ts,.py,.html,.css,.json,.md,.txt"
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleClear}
                  className="flex items-center gap-3 px-5 py-3 bg-white/80 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">清空</span>
                </button>
              </div>

              <button
                onClick={handleCreateSnippet}
                disabled={!content.trim() || isCreating}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{isCreating ? '生成中...' : '生成链接'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share URL */}
        {shareUrl && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-green-800 font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  分享链接已生成：
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 min-w-0 px-4 py-3 bg-white/80 border border-green-300/50 rounded-xl text-sm font-mono backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? '已复制' : '复制'}</span>
                  </button>
                  <button
                    onClick={handleOpenInNewWindow}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">打开</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Snippets */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-4">最近分享的代码</h3>
          <div className="text-gray-500 text-sm">
            <Link href="/recent" className="text-blue-600 hover:underline">
              查看最近分享的代码片段 →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-sm text-gray-500">
        <p>HTMLShare - 基于 Next.js + Supabase + Tailwind CSS 构建</p>
        <p className="mt-1">开源代码分享平台 • 简单快捷 • 安全稳定</p>
      </footer>
    </div>
  )
}