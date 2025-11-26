import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { SnippetService } from '@/services/snippetService'
import { devStorage, isDevMode } from '@/services/devStorageService'
import { withCompression } from '@/lib/compression'

interface Params {
  id: string
}

export const GET = withCompression(async (
  request: NextRequest,
  { params }: { params: Promise<Params> }
) => {
  try {
    const { id } = await params // Await the params promise in Next.js 15+

    // 开发模式使用内存存储
    if (isDevMode()) {
      console.log(`🛠️ Using dev mode storage to get snippet: ${id}`)

      const result = await devStorage.getSnippet(id)

      if (result.error || !result.snippet) {
        return NextResponse.json(
          { error: result.error || '代码片段未找到' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        snippet: result.snippet
      })
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

    // 获取代码片段
    const { data: snippet, error } = await supabase
      .from('snippets')
      .select('*')
      .eq('id', id)
      .eq('is_public', true)
      .single()

    if (error || !snippet) {
      console.error('Snippet not found:', { id, error })

      let errorMessage = '代码片段未找到'
      let statusCode = 404

      // 检查是否是ID格式错误
      if (error?.code === '22P02' || (typeof id === 'string' && !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))) {
        errorMessage = '无效的代码片段ID格式'
        statusCode = 400
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage
        },
        { status: statusCode }
      )
    }

    // 增加浏览数（通过share_logs表触发器自动完成）
    await supabase
      .from('share_logs')
      .insert([{
        snippet_id: id,
        user_id: null, // 匿名访问
        ip_address: null,
        user_agent: request.headers.get('user-agent') || null,
        referrer: request.headers.get('referer') || null
      }])

    return NextResponse.json({
      success: true,
      snippet
    })

  } catch (error: any) {
    console.error('API error:', error)

    // 更详细的错误处理
    let errorMessage = '服务器错误'
    let statusCode = 500

    if (error.message?.includes('Invalid UUID')) {
      errorMessage = 'ID格式无效'
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params // Await the params promise in Next.js 15+
    const supabase = await createClient()

    // 验证用户认证
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, language, description, is_public, tags } = body

    const snippetService = new SnippetService(true)
    const result = await snippetService.updateSnippet(
      id,
      { title, content, language, description, is_public, tags },
      user.id
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params // Await the params promise in Next.js 15+
    const supabase = await createClient()

    // 验证用户认证
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }

    const snippetService = new SnippetService(true)
    const result = await snippetService.deleteSnippet(id, user.id)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ message: '删除成功' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}