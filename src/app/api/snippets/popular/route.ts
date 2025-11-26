import { NextRequest, NextResponse } from 'next/server'
import { optimizedQueryService } from '@/services/optimizedQueryService'
import { withPerformanceMonitoring } from '@/utils/performanceUtils'

const getPopularSnippets = withPerformanceMonitoring(
  optimizedQueryService.getPopularSnippets.bind(optimizedQueryService),
  'getPopularSnippets'
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)

    const result = await getPopularSnippets(limit)

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=1800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=1800'
      }
    })

  } catch (error: any) {
    console.error('Popular snippets API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}