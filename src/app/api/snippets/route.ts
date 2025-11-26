import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { SnippetService } from '@/services/snippetService'
import { LanguageType } from '@/types/database'
import { devStorage, isDevMode } from '@/services/devStorageService'
import { withCompression } from '@/lib/compression'

export const GET = withCompression(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const language = searchParams.get('language') as LanguageType | null
    const userId = searchParams.get('user_id')
    const featured = searchParams.get('featured') === 'true'
    const sortBy = searchParams.get('sort_by') as any
    const sortOrder = searchParams.get('sort_order') as any
    const query = searchParams.get('q')

    const filters = {
      language: language || undefined,
      user_id: userId || undefined,
      is_featured: featured || undefined,
      sort_by: sortBy || 'created_at',
      sort_order: sortOrder || 'desc'
    }

    const snippetService = new SnippetService(true)

    let result
    if (query) {
      result = await snippetService.searchSnippets(query, filters, page, limit)
    } else {
      result = await snippetService.getSnippets(filters, page, limit)
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.count,
        totalPages: Math.ceil(result.count / limit)
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
})

export const POST = withCompression(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { title, content, language, description, is_public = true } = body

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: '代码内容不能为空' },
        { status: 400 }
      )
    }

    if (!language) {
      return NextResponse.json(
        { error: '请选择编程语言' },
        { status: 400 }
      )
    }

    // 开发模式使用内存存储
    if (isDevMode()) {
      console.log('🛠️ Using dev mode storage for snippet creation')

      const result = await devStorage.createSnippet({
        title: title || `${language} 代码片段`,
        content: content.trim(),
        language,
        description: description || null,
        is_public: true
      })

      if (result.error) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        snippet: result.snippet
      }, { status: 201 })
    }

    // 生产模式使用 Supabase
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // 创建匿名代码片段 (使用 service role 绕过 RLS)
    const { data: snippet, error } = await supabase
      .from('snippets')
      .insert([
        {
          title: title || `${language} 代码片段`,
          content: content.trim(),
          language,
          description: description || null,
          is_public: true,
          user_id: null  // 匿名创建
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: '创建失败，请重试' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      snippet
    }, { status: 201 })

  } catch (error: any) {
    console.error('API error:', error)

    // 更详细的错误处理
    let errorMessage = '服务器错误'
    let statusCode = 500

    if (error.message?.includes('JSON')) {
      errorMessage = '请求数据格式错误'
      statusCode = 400
    } else if (error.code === 'PGRST204') {
      errorMessage = '创建失败，请检查数据格式'
      statusCode = 400
    } else if (error.code === 'PGRST116') {
      errorMessage = '数据库连接超时，请重试'
      statusCode = 503
    } else if (error.message?.includes('network')) {
      errorMessage = '网络错误，请检查连接'
      statusCode = 503
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      },
      { status: statusCode }
    )
  }
})