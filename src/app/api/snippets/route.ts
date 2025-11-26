import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { SnippetService } from '@/services/snippetService'
import { LanguageType } from '@/types/database'
import { devStorage, isDevMode } from '@/services/devStorageService'
import { withCompression } from '@/lib/compression'
import { ApiResponseBuilder, withErrorHandling } from '@/lib/apiResponse'
import { CacheMethods } from '@/lib/cacheService'
import { withRateLimit, RateLimitConfigs } from '@/lib/rateLimit'

export const GET = withCompression(withRateLimit(
  RateLimitConfigs.api
)(withErrorHandling(async (request: NextRequest) => {
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

  // 创建缓存键
  const cacheKey = JSON.stringify({ filters, page, limit, query })

  // 数据获取函数
  const fetchData = async () => {
    const snippetService = new SnippetService(true)

    let result
    if (query) {
      result = await snippetService.searchSnippets(query, filters, page, limit)
    } else {
      result = await snippetService.getSnippets(filters, page, limit)
    }

    if (result.error) {
      throw new Error(result.error)
    }

    return {
      data: result.data,
      count: result.count
    }
  }

  // 使用缓存
  const cachedResult = await (query
    ? CacheMethods.getSearchResults(query, page, fetchData)
    : CacheMethods.getSnippetList(cacheKey, fetchData)
  )

  return ApiResponseBuilder.paginated(
    cachedResult.data,
    { page, limit, total: cachedResult.count },
    '获取代码片段成功'
  )
})))

export const POST = withCompression(withRateLimit(
  RateLimitConfigs.create
)(withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  const { title, content, language, description, is_public = true } = body

  if (!content || !content.trim()) {
    return ApiResponseBuilder.error('代码内容不能为空', 400)
  }

  if (!language) {
    return ApiResponseBuilder.error('请选择编程语言', 400)
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
      return ApiResponseBuilder.error(result.error, 500)
    }

    return ApiResponseBuilder.success(result.snippet, '代码片段创建成功')
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
    return ApiResponseBuilder.error('创建失败，请重试', 500)
  }

  // 清除相关缓存
  await CacheMethods.invalidateSnippet(snippet.id)

  return ApiResponseBuilder.success(snippet, '代码片段创建成功')
})))