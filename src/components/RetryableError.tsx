import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RetryableErrorProps {
  error: string
  onRetry: () => void
  retryText?: string
  className?: string
  showErrorDetails?: boolean
}

export default function RetryableError({
  error,
  onRetry,
  retryText = '重试',
  className,
  showErrorDetails = false
}: RetryableErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <div className={cn('p-4 bg-red-50 border border-red-200 rounded-lg', className)}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800">
            操作失败
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {error}
          </p>

          {showErrorDetails && (
            <details className="mt-2">
              <summary className="text-xs text-red-600 cursor-pointer hover:text-red-700">
                查看详细信息
              </summary>
              <pre className="mt-1 text-xs text-red-600 whitespace-pre-wrap overflow-auto max-h-32">
                {error}
              </pre>
            </details>
          )}

          <div className="mt-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-800 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRetrying && (
                <div className="w-3 h-3 animate-spin rounded-full border border-red-400 border-t-transparent" />
              )}
              {isRetrying ? '重试中...' : retryText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const retry = async (): Promise<T> => {
    setIsRetrying(true)

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt)
        const result = await fn()
        setIsRetrying(false)
        setRetryCount(0)
        return result
      } catch (error) {
        if (attempt === maxRetries) {
          setIsRetrying(false)
          setRetryCount(0)
          throw error
        }

        // 指数退避延迟
        const retryDelay = delay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
      }
    }

    throw new Error('Max retries exceeded')
  }

  return {
    retry,
    isRetrying,
    retryCount,
    maxRetries
  }
}