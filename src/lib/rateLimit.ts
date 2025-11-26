import { NextRequest, NextResponse } from 'next/server'
import { cacheService } from './cacheService'
import { ApiResponseBuilder } from './apiResponse'

export interface RateLimitConfig {
  windowMs: number      // 时间窗口（毫秒）
  maxRequests: number   // 最大请求数
  skipSuccessful?: boolean  // 是否跳过成功的请求
  skipFailedRequests?: boolean  // 是否跳过失败的请求
  message?: string      // 自定义错误消息
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  totalRequests: number
}

export class RateLimiter {
  constructor(private config: RateLimitConfig) {}

  /**
   * 检查速率限制
   * @param key 唯一标识符（如IP地址或用户ID）
   */
  async checkLimit(key: string): Promise<RateLimitResult> {
    const now = Date.now()
    const windowStart = Math.floor(now / this.config.windowMs) * this.config.windowMs
    const cacheKey = `ratelimit:${key}:${windowStart}`

    try {
      // 使用Redis进行原子性操作
      const requests = await cacheService.increment(
        cacheKey,
        1,
        Math.ceil(this.config.windowMs / 1000)
      )

      const remaining = Math.max(0, this.config.maxRequests - requests)
      const resetTime = windowStart + this.config.windowMs

      return {
        allowed: requests <= this.config.maxRequests,
        remaining,
        resetTime,
        totalRequests: requests
      }
    } catch (error) {
      console.error('Rate limit check failed:', error)
      // 如果Redis不可用，允许请求通过
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
        totalRequests: 1
      }
    }
  }
}

/**
 * 获取客户端IP地址
 */
export function getClientIP(request: NextRequest): string {
  // 优先检查代理头
  const xForwardedFor = request.headers.get('x-forwarded-for')
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }

  const xRealIp = request.headers.get('x-real-ip')
  if (xRealIp) {
    return xRealIp
  }

  // Vercel specific
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for')
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim()
  }

  // 从连接信息获取（开发环境）
  return '127.0.0.1'
}

/**
 * 速率限制中间件
 */
export function withRateLimit(
  config: RateLimitConfig,
  keyGenerator?: (request: NextRequest) => string
) {
  const limiter = new RateLimiter(config)

  return function <T extends any[], R>(
    handler: (...args: T) => Promise<NextResponse>
  ) {
    return async (...args: T): Promise<NextResponse> => {
      const request = args[0] as NextRequest

      // 生成速率限制键
      const key = keyGenerator ? keyGenerator(request) : getClientIP(request)

      // 检查速率限制
      const result = await limiter.checkLimit(key)

      // 如果超出限制，返回429错误
      if (!result.allowed) {
        const response = ApiResponseBuilder.error(
          config.message || `请求过于频繁，请在 ${Math.ceil((result.resetTime - Date.now()) / 1000)} 秒后重试`,
          429
        )

        // 添加速率限制相关的响应头
        response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
        response.headers.set('X-RateLimit-Reset', result.resetTime.toString())
        response.headers.set('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString())

        return response
      }

      // 执行原始处理器
      const response = await handler(...args)

      // 添加速率限制信息到响应头
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString())
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
      response.headers.set('X-RateLimit-Reset', result.resetTime.toString())

      return response
    }
  }
}

// 预定义的速率限制配置
export const RateLimitConfigs = {
  // API通用限制：每分钟60个请求
  api: {
    windowMs: 60 * 1000,    // 1分钟
    maxRequests: 60,
    message: '请求过于频繁，请稍后重试'
  },

  // 创建操作限制：每分钟10个请求
  create: {
    windowMs: 60 * 1000,    // 1分钟
    maxRequests: 10,
    message: '创建操作过于频繁，请稍后重试'
  },

  // 搜索限制：每分钟30个请求
  search: {
    windowMs: 60 * 1000,    // 1分钟
    maxRequests: 30,
    message: '搜索请求过于频繁，请稍后重试'
  },

  // 严格限制：每小时100个请求
  strict: {
    windowMs: 60 * 60 * 1000,  // 1小时
    maxRequests: 100,
    message: '请求频率过高，请1小时后重试'
  }
}