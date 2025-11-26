import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { optimizedQueryService } from '@/services/optimizedQueryService'
import { withPerformanceMonitoring } from '@/utils/performanceUtils'

// 使用性能监控包装查询函数
const getPaginatedSnippets = withPerformanceMonitoring(
  optimizedQueryService.getPaginatedSnippets.bind(optimizedQueryService),
  'getPaginatedSnippets'
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: Math.min(parseInt(searchParams.get('limit') || '10'), 50), // 限制最大页面大小
      language: searchParams.get('language') || undefined,
      userId: searchParams.get('userId') || undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
      search: searchParams.get('search') || undefined
    }

    const result = await getPaginatedSnippets(options)

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, s-maxage=300',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=300'
      }
    })

  } catch (error: any) {
    console.error('Optimized snippets API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}