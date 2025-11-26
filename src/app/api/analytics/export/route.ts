import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { dbMonitor } from '@/utils/performanceUtils'

export async function GET(request: NextRequest) {
  try {
    const redis = getRedisClient()
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'

    // 收集所有性能数据
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        timeRange: '24 hours',
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        cacheHitRate: 0
      },
      webVitals: {} as Record<string, any>,
      systemMetrics: {},
      recommendations: [] as string[]
    }

    // 获取 Web Vitals 数据
    if (redis) {
      const webVitalsMetrics = ['LCP', 'FID', 'FCP', 'CLS', 'TTFB']
      for (const metric of webVitalsMetrics) {
        const latestKey = `web_vitals:${metric}:latest`
        const latest = await redis.get(latestKey)
        if (latest) {
          reportData.webVitals[metric] = JSON.parse(latest)
        }
      }
    }

    // 获取系统指标
    const dbMetrics = dbMonitor.getMetrics()
    reportData.systemMetrics = {
      databaseQueries: dbMetrics.queryCount,
      averageQueryTime: dbMetrics.averageQueryTime,
      slowQueries: dbMetrics.slowQueries,
      cacheHitRate: dbMetrics.cacheHitRate
    }

    reportData.summary = {
      timeRange: '24 hours',
      totalRequests: dbMetrics.queryCount,
      averageResponseTime: dbMetrics.averageQueryTime,
      errorRate: dbMetrics.queryCount > 0 ? (dbMetrics.slowQueries / dbMetrics.queryCount) * 100 : 0,
      cacheHitRate: dbMetrics.cacheHitRate * 100
    }

    // 生成性能建议
    reportData.recommendations = generateRecommendations(reportData)

    if (format === 'csv') {
      return generateCSVResponse(reportData)
    } else if (format === 'html') {
      return generateHTMLResponse(reportData)
    } else {
      return NextResponse.json(reportData, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="performance-report-${new Date().toISOString().split('T')[0]}.json"`
        }
      })
    }

  } catch (error: any) {
    console.error('Export API error:', error)
    return NextResponse.json(
      { error: '生成报告失败' },
      { status: 500 }
    )
  }
}

// 生成性能建议
function generateRecommendations(data: any): string[] {
  const recommendations: string[] = []

  // 检查 LCP
  if (data.webVitals.LCP && data.webVitals.LCP.value > 2500) {
    recommendations.push('LCP 过高，建议优化图片加载和关键渲染路径')
  }

  // 检查 FID
  if (data.webVitals.FID && data.webVitals.FID.value > 100) {
    recommendations.push('FID 过高，建议减少 JavaScript 执行时间')
  }

  // 检查 CLS
  if (data.webVitals.CLS && data.webVitals.CLS.value > 0.1) {
    recommendations.push('CLS 过高，建议为图片和广告指定尺寸')
  }

  // 检查响应时间
  if (data.summary.averageResponseTime > 500) {
    recommendations.push('平均响应时间过高，建议优化数据库查询和缓存策略')
  }

  // 检查缓存命中率
  if (data.summary.cacheHitRate < 80) {
    recommendations.push('缓存命中率偏低，建议优化缓存策略和缓存预热')
  }

  // 检查错误率
  if (data.summary.errorRate > 1) {
    recommendations.push('错误率偏高，建议检查应用日志并修复相关问题')
  }

  if (recommendations.length === 0) {
    recommendations.push('应用性能表现良好，继续保持！')
  }

  return recommendations
}

// 生成 CSV 格式响应
function generateCSVResponse(data: any) {
  let csv = 'Metric,Value,Rating,Timestamp\n'

  // Web Vitals
  for (const [metric, value] of Object.entries(data.webVitals)) {
    const metricData = value as any
    csv += `${metric},${metricData.value},${metricData.rating},${new Date(metricData.timestamp).toISOString()}\n`
  }

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="performance-report-${new Date().toISOString().split('T')[0]}.csv"`
    }
  })
}

// 生成 HTML 格式响应
function generateHTMLResponse(data: any) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>性能报告 - ${data.generatedAt}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .metric { background: white; padding: 15px; border: 1px solid #dee2e6; border-radius: 6px; margin-bottom: 15px; }
        .good { border-left: 4px solid #28a745; }
        .warning { border-left: 4px solid #ffc107; }
        .poor { border-left: 4px solid #dc3545; }
        .recommendations { background: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 30px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>HTMLShare 性能报告</h1>
        <p>生成时间: ${new Date(data.generatedAt).toLocaleString('zh-CN')}</p>
        <p>时间范围: ${data.summary.timeRange}</p>
      </div>

      <h2>概览</h2>
      <div class="metric">
        <strong>总请求数:</strong> ${data.summary.totalRequests}<br>
        <strong>平均响应时间:</strong> ${data.summary.averageResponseTime.toFixed(1)}ms<br>
        <strong>错误率:</strong> ${data.summary.errorRate.toFixed(2)}%<br>
        <strong>缓存命中率:</strong> ${data.summary.cacheHitRate.toFixed(1)}%
      </div>

      <h2>Core Web Vitals</h2>
      ${Object.entries(data.webVitals).map(([metric, value]: [string, any]) => `
        <div class="metric ${value.rating}">
          <strong>${metric}:</strong> ${value.value}${metric === 'CLS' ? '' : 'ms'}
          <span style="color: ${value.rating === 'good' ? 'green' : value.rating === 'needs-improvement' ? 'orange' : 'red'};">
            (${value.rating})
          </span>
        </div>
      `).join('')}

      <div class="recommendations">
        <h2>性能建议</h2>
        <ul>
          ${data.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="performance-report-${new Date().toISOString().split('T')[0]}.html"`
    }
  })
}