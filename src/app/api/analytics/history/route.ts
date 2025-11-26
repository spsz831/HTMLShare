import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    const redis = getRedisClient()

    if (!redis) {
      return NextResponse.json({ error: 'Redis 不可用' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const hours = parseInt(searchParams.get('hours') || '24')

    // Web Vitals 历史数据
    const webVitalsMetrics = ['LCP', 'FID', 'FCP', 'CLS', 'TTFB']
    const historyData: { [key: string]: Array<{ value: number; timestamp: number }> } = {}

    for (const metricName of webVitalsMetrics) {
      const historyKey = `web_vitals:${metricName}:history`
      const rawHistory = await redis.lrange(historyKey, 0, hours - 1)

      historyData[metricName] = rawHistory.map(item => {
        try {
          return JSON.parse(item)
        } catch {
          return { value: 0, timestamp: Date.now() }
        }
      }).reverse() // 按时间顺序排列
    }

    // 系统指标历史数据（模拟）
    const systemMetrics = ['responseTime', 'errorRate', 'cacheHitRate']

    for (const metricName of systemMetrics) {
      // 生成模拟的历史数据
      // 实际应用中应该从监控系统或数据库获取真实数据
      historyData[metricName] = generateMockHistory(metricName, hours)
    }

    return NextResponse.json(historyData)

  } catch (error: any) {
    console.error('History API error:', error)
    return NextResponse.json(
      { error: '获取历史数据失败' },
      { status: 500 }
    )
  }
}

// 生成模拟的历史数据
function generateMockHistory(metricName: string, hours: number): Array<{ value: number; timestamp: number }> {
  const data: Array<{ value: number; timestamp: number }> = []
  const now = Date.now()
  const hourInMs = 60 * 60 * 1000

  for (let i = hours - 1; i >= 0; i--) {
    const timestamp = now - (i * hourInMs)
    let value = 0

    switch (metricName) {
      case 'responseTime':
        value = 150 + Math.random() * 100 + Math.sin(i / 6) * 50 // 模拟响应时间变化
        break
      case 'errorRate':
        value = Math.max(0, 0.5 + Math.random() * 2 + Math.sin(i / 8) * 1) // 模拟错误率
        break
      case 'cacheHitRate':
        value = 85 + Math.random() * 10 - Math.sin(i / 4) * 5 // 模拟缓存命中率
        break
      default:
        value = Math.random() * 100
    }

    data.push({
      value: Math.round(value * 100) / 100,
      timestamp
    })
  }

  return data
}