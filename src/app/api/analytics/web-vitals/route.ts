import { NextRequest, NextResponse } from 'next/server'

interface WebVitalsData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  userAgent: string
  labels?: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalsData = await request.json()

    // 验证数据
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: '无效的指标数据' },
        { status: 400 }
      )
    }

    // 记录到控制台（生产环境中应该发送到分析服务）
    console.log('📊 Web Vitals Metric:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: new Date(metric.timestamp).toISOString(),
      url: metric.url
    })

    // 这里可以将数据发送到各种分析服务：

    // 1. 发送到数据库
    // await saveMetricToDatabase(metric)

    // 2. 发送到 Google Analytics
    // await sendToGoogleAnalytics(metric)

    // 3. 发送到其他分析平台
    // await sendToAnalyticsPlatform(metric)

    // 4. 存储到 Redis 用于实时监控
    await storeMetricToRedis(metric)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Web Vitals API error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

// 存储指标到 Redis 用于实时监控
async function storeMetricToRedis(metric: WebVitalsData) {
  try {
    const { getRedisClient } = await import('@/lib/redis')
    const redis = getRedisClient()

    if (!redis) return

    // 存储最新的指标值
    const key = `web_vitals:${metric.name}:latest`
    await redis.setex(key, 3600, JSON.stringify(metric)) // 1小时过期

    // 存储历史数据（用于趋势分析）
    const historyKey = `web_vitals:${metric.name}:history`
    await redis.lpush(historyKey, JSON.stringify({
      value: metric.value,
      rating: metric.rating,
      timestamp: metric.timestamp,
      url: metric.url
    }))

    // 保持最近100条记录
    await redis.ltrim(historyKey, 0, 99)

    // 存储聚合数据
    const aggregateKey = `web_vitals:aggregate:${new Date().toISOString().split('T')[0]}`
    await redis.hincrby(aggregateKey, `${metric.name}_count`, 1)
    await redis.hincrbyfloat(aggregateKey, `${metric.name}_sum`, metric.value)

    // 设置聚合数据过期时间（7天）
    await redis.expire(aggregateKey, 7 * 24 * 3600)

  } catch (error) {
    console.error('Failed to store metric to Redis:', error)
  }
}

// 获取性能指标统计
export async function GET(request: NextRequest) {
  try {
    const { getRedisClient } = await import('@/lib/redis')
    const redis = getRedisClient()

    if (!redis) {
      return NextResponse.json({ error: 'Redis 不可用' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const period = searchParams.get('period') || '1d'

    if (metric) {
      // 获取特定指标的数据
      const latestKey = `web_vitals:${metric}:latest`
      const historyKey = `web_vitals:${metric}:history`

      const latest = await redis.get(latestKey)
      const history = await redis.lrange(historyKey, 0, 23) // 最近24条记录

      return NextResponse.json({
        metric,
        latest: latest ? JSON.parse(latest) : null,
        history: history.map(item => JSON.parse(item))
      })
    } else {
      // 获取所有指标的摘要
      const vitalsMetrics = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB']
      const summary: any = {}

      for (const metricName of vitalsMetrics) {
        const latestKey = `web_vitals:${metricName}:latest`
        const latest = await redis.get(latestKey)

        if (latest) {
          summary[metricName] = JSON.parse(latest)
        }
      }

      return NextResponse.json({ summary })
    }

  } catch (error: any) {
    console.error('Get Web Vitals error:', error)
    return NextResponse.json(
      { error: '获取指标失败' },
      { status: 500 }
    )
  }
}