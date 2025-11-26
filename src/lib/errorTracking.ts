// 错误跟踪和报告系统
export class ErrorTracker {
  private static instance: ErrorTracker
  private errors: Array<ErrorReport> = []
  private isProduction = process.env.NODE_ENV === 'production'

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }

  constructor() {
    // 自动捕获未处理的错误
    this.setupGlobalErrorHandlers()
  }

  // 手动报告错误
  public reportError(error: Error | string, context?: ErrorContext) {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: typeof error === 'string' ? error : error.message,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: Date.now(),
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        ...context
      },
      severity: this.determineSeverity(error, context),
      userId: this.getUserId(),
      sessionId: this.getSessionId()
    }

    this.processError(errorReport)
  }

  // 报告API错误
  public reportApiError(
    endpoint: string,
    status: number,
    error: any,
    requestData?: any
  ) {
    this.reportError(error, {
      type: 'api_error',
      endpoint,
      status,
      requestData: this.sanitizeData(requestData),
      category: 'network'
    })
  }

  // 报告组件错误
  public reportComponentError(
    componentName: string,
    error: Error,
    errorInfo?: any
  ) {
    this.reportError(error, {
      type: 'component_error',
      component: componentName,
      errorInfo,
      category: 'react'
    })
  }

  // 报告用户操作错误
  public reportUserActionError(
    action: string,
    error: Error,
    metadata?: any
  ) {
    this.reportError(error, {
      type: 'user_action_error',
      action,
      metadata,
      category: 'user_interaction'
    })
  }

  // 设置全局错误处理器
  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return

    // 捕获JavaScript错误
    window.addEventListener('error', (event) => {
      this.reportError(event.error || event.message, {
        type: 'javascript_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        category: 'javascript'
      })
    })

    // 捕获Promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(event.reason, {
        type: 'unhandled_promise_rejection',
        category: 'promise'
      })
    })

    // 捕获资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        const target = event.target as Element
        this.reportError('Resource failed to load', {
          type: 'resource_error',
          resource: target.tagName,
          src: target.getAttribute('src') || target.getAttribute('href') || undefined,
          category: 'resource'
        })
      }
    }, true)
  }

  // 处理错误报告
  private processError(errorReport: ErrorReport) {
    // 添加到本地存储
    this.errors.push(errorReport)

    // 限制本地存储的错误数量
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-50)
    }

    // 控制台输出
    this.logError(errorReport)

    // 发送到服务器
    this.sendErrorReport(errorReport)

    // 触发错误通知
    this.notifyErrorHandlers(errorReport)
  }

  private logError(errorReport: ErrorReport) {
    const { severity, message, context } = errorReport

    if (!this.isProduction) {
      console.group(`🚨 Error Tracker - ${severity.toUpperCase()}`)
      console.error('Message:', message)
      console.error('Context:', context)
      if (errorReport.stack) {
        console.error('Stack:', errorReport.stack)
      }
      console.groupEnd()
    }

    // 严重错误在生产环境也要输出
    if (severity === 'critical') {
      console.error(`Critical Error: ${message}`, {
        id: errorReport.id,
        timestamp: errorReport.timestamp
      })
    }
  }

  private async sendErrorReport(errorReport: ErrorReport) {
    try {
      // 批量发送错误以减少请求次数
      this.batchSendErrors(errorReport)
    } catch (error) {
      console.warn('Failed to send error report:', error)
    }
  }

  private batchSendErrors = this.debounce(async (errors: ErrorReport[]) => {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errors,
          metadata: {
            app_version: process.env.NEXT_PUBLIC_APP_VERSION,
            environment: process.env.NODE_ENV,
            timestamp: Date.now()
          }
        })
      })
    } catch (error) {
      console.warn('Batch error sending failed:', error)
    }
  }, 2000)

  private determineSeverity(error: any, context?: ErrorContext): Severity {
    const message = typeof error === 'string' ? error : error?.message || ''

    // 关键错误
    if (
      context?.type === 'javascript_error' ||
      message.includes('ChunkLoadError') ||
      message.includes('network') ||
      (context?.status !== undefined && context.status >= 500)
    ) {
      return 'critical'
    }

    // 高优先级错误
    if (
      context?.type === 'api_error' ||
      (context?.status !== undefined && context.status >= 400) ||
      message.includes('timeout')
    ) {
      return 'high'
    }

    // 中等优先级
    if (
      context?.type === 'component_error' ||
      context?.type === 'user_action_error'
    ) {
      return 'medium'
    }

    return 'low'
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getUserId(): string | null {
    // 从localStorage或cookie获取用户ID
    try {
      return localStorage.getItem('user_id') || null
    } catch {
      return null
    }
  }

  private getSessionId(): string {
    // 生成或获取会话ID
    const sessionKey = 'htmlshare_session'
    try {
      let sessionId = sessionStorage.getItem(sessionKey)
      if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        sessionStorage.setItem(sessionKey, sessionId)
      }
      return sessionId
    } catch {
      return 'unknown_session'
    }
  }

  private sanitizeData(data: any): any {
    if (!data) return data

    // 移除敏感信息
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth']

    const sanitize = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj

      if (Array.isArray(obj)) {
        return obj.map(sanitize)
      }

      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        if (sensitiveKeys.some(sensitive =>
          key.toLowerCase().includes(sensitive)
        )) {
          sanitized[key] = '[REDACTED]'
        } else {
          sanitized[key] = sanitize(value)
        }
      }
      return sanitized
    }

    return sanitize(data)
  }

  private debounce(func: (errors: ErrorReport[]) => void, wait: number) {
    let timeout: NodeJS.Timeout
    const errorQueue: ErrorReport[] = []

    return function(error: ErrorReport) {
      errorQueue.push(error)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func([...errorQueue])
        errorQueue.length = 0
      }, wait)
    }
  }

  private errorHandlers: Array<(error: ErrorReport) => void> = []

  public onError(handler: (error: ErrorReport) => void) {
    this.errorHandlers.push(handler)
  }

  private notifyErrorHandlers(errorReport: ErrorReport) {
    this.errorHandlers.forEach(handler => {
      try {
        handler(errorReport)
      } catch (error) {
        console.warn('Error handler failed:', error)
      }
    })
  }

  // 获取错误统计
  public getErrorStats() {
    const now = Date.now()
    const oneHour = 60 * 60 * 1000

    return {
      total: this.errors.length,
      lastHour: this.errors.filter(e => now - e.timestamp < oneHour).length,
      bySeverity: this.errors.reduce((acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1
        return acc
      }, {} as Record<Severity, number>),
      byCategory: this.errors.reduce((acc, error) => {
        const category = error.context.category || 'unknown'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  // 清理旧错误
  public cleanup() {
    const oneDay = 24 * 60 * 60 * 1000
    const cutoff = Date.now() - oneDay
    this.errors = this.errors.filter(error => error.timestamp > cutoff)
  }
}

// 类型定义
export interface ErrorContext {
  type?: string
  component?: string
  action?: string
  endpoint?: string
  status?: number
  category?: 'javascript' | 'react' | 'network' | 'user_interaction' | 'resource' | 'promise'
  filename?: string
  lineno?: number
  colno?: number
  errorInfo?: any
  requestData?: any
  metadata?: any
  url?: string
  userAgent?: string
  timestamp?: string
  resource?: string  // 添加缺少的resource字段
  src?: string       // 添加缺少的src字段
}

export interface ErrorReport {
  id: string
  message: string
  stack?: string
  timestamp: number
  context: ErrorContext
  severity: Severity
  userId: string | null
  sessionId: string
}

export type Severity = 'low' | 'medium' | 'high' | 'critical'

// 创建全局实例
export const errorTracker = ErrorTracker.getInstance()

// React错误边界Hook
export function useErrorBoundary(componentName: string) {
  return (error: Error, errorInfo: any) => {
    errorTracker.reportComponentError(componentName, error, errorInfo)
  }
}