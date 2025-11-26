import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { errors, metadata } = await request.json()

    // 在开发环境记录错误
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Report Received')
      console.log('Errors Count:', errors.length)
      console.log('Metadata:', metadata)

      errors.forEach((error: any, index: number) => {
        console.group(`Error ${index + 1}: ${error.severity.toUpperCase()}`)
        console.error('Message:', error.message)
        console.log('Context:', error.context)
        if (error.stack) {
          console.error('Stack:', error.stack)
        }
        console.groupEnd()
      })

      console.groupEnd()
    }

    // 在生产环境，这里可以发送到错误监控服务
    // 例如: Sentry, Bugsnag, Rollbar
    if (process.env.NODE_ENV === 'production') {
      // await sendToErrorTrackingService(errors, metadata)

      // 严重错误立即通知
      const criticalErrors = errors.filter((e: any) => e.severity === 'critical')
      if (criticalErrors.length > 0) {
        // await notifyDevelopers(criticalErrors)
      }
    }

    return NextResponse.json({
      success: true,
      received: errors.length,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('Error tracking endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to process error reports' },
      { status: 500 }
    )
  }
}