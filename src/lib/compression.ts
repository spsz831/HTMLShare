import { NextRequest, NextResponse } from 'next/server'

/**
 * 压缩中间件 - 优化大型响应的传输
 */
export function withCompression(handler: (request: NextRequest, params?: any) => Promise<NextResponse>) {
  return async (request: NextRequest, params?: any) => {
    const response = await handler(request, params)

    // 检查客户端是否支持压缩
    const acceptEncoding = request.headers.get('accept-encoding') || ''
    const supportsGzip = acceptEncoding.includes('gzip')

    if (!supportsGzip) {
      return response
    }

    // 检查响应内容类型
    const contentType = response.headers.get('content-type') || ''
    const shouldCompress =
      contentType.includes('application/json') ||
      contentType.includes('text/') ||
      contentType.includes('application/javascript')

    if (shouldCompress) {
      // 只设置缓存头，让 Vercel 处理实际压缩
      const headers = new Headers(response.headers)
      headers.set('Vary', 'Accept-Encoding')
      headers.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400')

      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

    return response
  }
}

/**
 * 为大型HTML内容设置优化的缓存头
 */
export function setOptimizedHeaders(response: NextResponse, contentType: string = 'text/html') {
  const headers = new Headers(response.headers)

  // 设置压缩和缓存头
  headers.set('Content-Encoding', 'gzip, br')
  headers.set('Vary', 'Accept-Encoding')
  headers.set('Content-Type', contentType + '; charset=utf-8')

  // 根据内容类型设置不同的缓存策略
  if (contentType.includes('application/json')) {
    headers.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400')
  } else if (contentType.includes('text/html')) {
    headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400')
  } else {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // 安全头
  headers.set('X-Content-Type-Options', 'nosniff')

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

/**
 * 检查请求是否支持压缩
 */
export function supportsCompression(request: NextRequest): boolean {
  const acceptEncoding = request.headers.get('accept-encoding')
  return acceptEncoding ? (acceptEncoding.includes('gzip') || acceptEncoding.includes('br')) : false
}

/**
 * 获取响应大小（字节）
 */
export function getResponseSize(response: NextResponse): number {
  const contentLength = response.headers.get('content-length')
  if (contentLength) {
    return parseInt(contentLength)
  }

  // 如果没有Content-Length头，尝试估算大小
  const bodyString = response.body?.toString()
  return bodyString ? new Blob([bodyString]).size : 0
}