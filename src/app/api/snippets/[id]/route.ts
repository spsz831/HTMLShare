import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { SnippetService } from '@/services/snippetService'
import { devStorage, isDevMode } from '@/services/devStorageService'
import { withCompression } from '@/lib/compression'
import { ApiResponseBuilder, withErrorHandling } from '@/lib/apiResponse'

interface Params {
  id: string
}

export const GET = withCompression(withErrorHandling(async (
  request: NextRequest,
  { params }: { params: Promise<Params> }
) => {
  const { id } = await params // Await the params promise in Next.js 15+

  // 开发模式使用内存存储
  if (isDevMode()) {
    console.log(`🛠️ Using dev mode storage to get snippet: ${id}`)

    const result = await devStorage.getSnippet(id)

    if (result.error || !result.snippet) {
      return ApiResponseBuilder.error(result.error || '代码片段未找到', 404)
    }

    return ApiResponseBuilder.success(result.snippet, '获取代码片段成功')
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

    return ApiResponseBuilder.error(errorMessage, statusCode)
  }

  // 增加浏览数 - 简化版本，直接更新计数
  try {
    await supabase
      .from('snippets')
      .update({ view_count: snippet.view_count + 1 })
      .eq('id', id)
  } catch (updateError) {
    // 忽略浏览计数更新错误，不影响主要功能
    console.warn('Failed to update view count:', updateError)
  }

  return ApiResponseBuilder.success(snippet, '获取代码片段成功')
}))

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