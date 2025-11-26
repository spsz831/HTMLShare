import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { SnippetService } from '@/services/snippetService'
import { devStorage, isDevMode } from '@/services/devStorageService'

interface Params {
  id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
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
      return NextResponse.json(
        { error: '代码片段未找到' },
        { status: 404 }
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
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

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