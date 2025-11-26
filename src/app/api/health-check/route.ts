import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 简单的健康检查端点，用于测试API调用
  return NextResponse.json({
    status: 'ok',
    timestamp: Date.now(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV
  })
}