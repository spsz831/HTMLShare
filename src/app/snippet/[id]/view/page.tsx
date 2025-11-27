'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import DOMPurify from 'dompurify'
import LoadingSpinner from '@/components/LoadingSpinner'
import RetryableError, { useRetry } from '@/components/RetryableError'

interface Snippet {
  id: string
  title: string
  content: string
  language: string
  description: string | null
  view_count: number
  created_at: string
}

export default function SnippetViewPage() {
  const params = useParams()
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [renderedContent, setRenderedContent] = useState('')

  const renderContent = useCallback((content: string, language: string) => {
    try {
      if (language.toLowerCase() === 'html') {
        // 增强HTML渲染 - 禁用DOMPurify以保持完整样式
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
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow-x: auto;
            overflow-y: auto;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            line-height: 1.6;
            color: #333;
            background: #fff;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 16px;
        }
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
          // 如果是完整HTML，智能注入CSS框架
          if (!content.includes('tailwindcss') && !content.includes('bootstrap')) {
            enhancedHtml = content
              .replace(/<head>/i, `<head>
    <!-- HTMLShare Enhanced Rendering -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUa+IgAdbYQFnX1ZnlG2xCBCl8VxM9A5xDf+VqhR+Fn0gx6r8p+DGGlQEG6d" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        body {
            font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>`)
              .replace(/<\/body>/i, `
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</body>`);
          }
        }

        // 不使用DOMPurify - 保持原始HTML完整性
        setRenderedContent(enhancedHtml)
      } else {
        // 非HTML内容显示提示
        setRenderedContent(`
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif; background: #f8f9fa;">
            <div style="text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 16px;">此内容类型不支持纯渲染模式</h2>
              <p style="color: #666; margin-bottom: 24px;">仅支持 HTML 内容的纯渲染展示</p>
              <a href="/snippet/${params.id}" style="
                display: inline-block;
                padding: 12px 24px;
                background: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                transition: all 0.2s;
              " onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">
                返回完整视图
              </a>
            </div>
          </div>
        `)
      }
    } catch (error) {
      setRenderedContent('<div style="color: red; text-align: center; padding: 50px;">渲染出错</div>')
    }
  }, [params.id]) // useCallback结束

  // 获取代码片段的核心请求逻辑（用于重试）
  const fetchSnippetRequest = async () => {
    const response = await fetch(`/api/snippets/${params.id}`, {
      headers: { 'Cache-Control': 'no-cache' }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || '服务器返回数据格式错误')
    }

    return data.data
  }

  const { retry, isRetrying } = useRetry(fetchSnippetRequest, 3, 1500)

  const fetchSnippet = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError('')

      const snippetData = await retry()
      setSnippet(snippetData)
    } catch (error) {
      console.error('获取代码片段失败:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setError('网络连接失败，请检查网络连接')
      } else if (error instanceof Error) {
        setError(`加载失败: ${error.message}`)
      } else {
        setError('未知错误，请稍后重试')
      }
    } finally {
      setLoading(false)
    }
  }, [retry])

  const handleRetryFetch = async () => {
    setError('')
    await fetchSnippet(params.id as string)
  }

  useEffect(() => {
    if (params.id) {
      fetchSnippet(params.id as string)
    }
  }, [params.id, fetchSnippet])

  useEffect(() => {
    if (snippet && snippet.content) {
      renderContent(snippet.content, snippet.language)
    }
  }, [snippet, renderContent])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        background: '#f8f9fa'
      }}>
        <LoadingSpinner
          size="lg"
          text={isRetrying ? '处理中...' : '加载中...'}
          className="text-blue-600"
        />
      </div>
    )
  }

  if (error || !snippet) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        background: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '40px'
        }}>
          {error ? (
            <>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545', marginBottom: '16px' }}>
                加载失败
              </h1>
              <RetryableError
                error={error}
                onRetry={handleRetryFetch}
                retryText="重新加载"
                showErrorDetails={process.env.NODE_ENV === 'development'}
                className="mb-6"
              />
              <Link href="/" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#6c757d',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'all 0.2s',
                marginTop: '16px'
              }}>返回首页</Link>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
                内容未找到
              </h1>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                该内容可能已被删除或不存在
              </p>
              <Link href="/" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}>返回首页</Link>
            </>
          )}
        </div>
      </div>
    )
  }

  // 纯HTML渲染 - 直接返回iframe内容
  if (snippet.language.toLowerCase() === 'html') {
    return (
      <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <iframe
          srcDoc={renderedContent}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block',
            backgroundColor: 'white'
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation-by-user-activation"
          title="HTML Preview"
          loading="eager"
        />
      </div>
    )
  }

  // 非HTML内容的处理
  return (
    <div
      style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}