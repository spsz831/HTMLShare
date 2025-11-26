// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// 只有在配置了DSN时才初始化Sentry
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // 服务器性能监控采样率
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // 开发环境启用调试信息
    debug: process.env.NODE_ENV === 'development',

    // 环境标识
    environment: process.env.NODE_ENV,

    // 发布版本
    release: process.env.NEXT_PUBLIC_APP_VERSION || 'development',

    // 集成功能
    integrations: [
      Sentry.nodeContextIntegration(),
    ],

    // 过滤敏感信息
    beforeSend(event, hint) {
      // 移除敏感的环境变量
      if (event.extra) {
        delete event.extra.SUPABASE_SERVICE_ROLE_KEY
        delete event.extra.SENTRY_DSN
        delete event.extra.REDIS_URL
      }

      // 过滤常见的服务器错误
      const error = hint.originalException
      if (error instanceof Error) {
        // 过滤数据库连接错误（通常是暂时性的）
        if (error.message.includes('ECONNREFUSED') ||
            error.message.includes('ETIMEDOUT')) {
          return null
        }
      }

      return event
    },

    // 开发环境启用Spotlight调试
    spotlight: process.env.NODE_ENV === 'development',
  })
}