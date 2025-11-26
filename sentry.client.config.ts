// This file configures the initialization of Sentry for the browser.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

// 只有在配置了DSN时才初始化Sentry
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // 性能监控采样率 - 生产环境降低以节省配额
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // 开发环境启用调试信息
    debug: process.env.NODE_ENV === 'development',

    // 错误时的重放采样率
    replaysOnErrorSampleRate: 1.0,

    // 会话重放采样率 - 生产环境降低
    replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

    // 环境标识
    environment: process.env.NODE_ENV,

    // 发布版本
    release: process.env.NEXT_PUBLIC_APP_VERSION || 'development',

    // 集成功能
    integrations: [
      Sentry.replayIntegration({
        maskAllText: false, // 允许文本记录以便更好地调试
        blockAllMedia: true, // 阻止媒体文件
      }),
      Sentry.browserTracingIntegration(),
    ],

    // 过滤掉不重要的错误
    beforeSend(event, hint) {
      // 过滤掉网络错误（通常是用户网络问题）
      if (hint.originalException && (hint.originalException as any).name === 'NetworkError') {
        return null
      }

      // 过滤掉取消的请求
      if (hint.originalException && (hint.originalException as any).name === 'AbortError') {
        return null
      }

      return event
    },

    // 性能事务过滤
    beforeSendTransaction(event) {
      // 过滤掉非常快的事务（可能是噪声）
      if (event.start_timestamp && event.timestamp) {
        const duration = (event.timestamp - event.start_timestamp) * 1000
        if (duration < 10) { // 小于10ms
          return null
        }
      }
      return event
    }
  })
}