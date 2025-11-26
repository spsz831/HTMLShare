import { NextRequest, NextResponse } from 'next/server'
import { optimizedQueryService } from '@/services/optimizedQueryService'
import { withPerformanceMonitoring } from '@/utils/performanceUtils'

const searchSnippets = withPerformanceMonitoring(
  optimizedQueryService.searchSnippets.bind(optimizedQueryService),
  'searchSnippets'
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: '搜索词至少需要2个字符' },
        { status: 400 }
      )
    }

    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: Math.min(parseInt(searchParams.get('limit') || '10'), 20),
      language: searchParams.get('language') || undefined
    }

    const result = await searchSnippets(query, options)

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        'CDN-Cache-Control': 'public, s-maxage=600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=600'
      }
    })

  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: '搜索服务暂时不可用' },
      { status: 500 }
    )
  }
}