import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export default function LoadingSpinner({
  size = 'md',
  className,
  text = '加载中...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizeClasses[size]
        )}
      />
      {text && (
        <span className="text-sm text-gray-600">{text}</span>
      )}
    </div>
  )
}

export function LoadingButton({
  children,
  loading,
  loadingText = '处理中...',
  className,
  ...props
}: {
  children: React.ReactNode
  loading: boolean
  loadingText?: string
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-blue-600 text-white hover:bg-blue-700',
        'transition-colors duration-200',
        className
      )}
    >
      {loading && <LoadingSpinner size="sm" className="text-white" />}
      {loading ? loadingText : children}
    </button>
  )
}