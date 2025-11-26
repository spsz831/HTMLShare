import { NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export class ApiResponseBuilder<T = any> {
  private response: ApiResponse<T> = {
    success: false
  }

  static success<T>(data?: T, message?: string): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message
    }
    return NextResponse.json(response)
  }

  static error(error: string, status: number = 400): NextResponse {
    const response: ApiResponse = {
      success: false,
      error
    }
    return NextResponse.json(response, { status })
  }

  static paginated<T>(
    data: T[],
    pagination: {
      page: number
      limit: number
      total: number
    },
    message?: string
  ): NextResponse {
    const response: ApiResponse<T[]> = {
      success: true,
      data,
      message,
      pagination: {
        ...pagination,
        totalPages: Math.ceil(pagination.total / pagination.limit)
      }
    }
    return NextResponse.json(response)
  }
}

// 错误处理中间件
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error: any) {
      console.error('API Error:', error)

      // 根据错误类型返回适当的错误信息
      let errorMessage = '服务器内部错误'
      let statusCode = 500

      if (error.message?.includes('JSON')) {
        errorMessage = '请求数据格式错误'
        statusCode = 400
      } else if (error.code === 'PGRST204') {
        errorMessage = '请求的资源不存在'
        statusCode = 404
      } else if (error.code === 'PGRST116') {
        errorMessage = '数据库连接超时，请重试'
        statusCode = 503
      } else if (error.message?.includes('network')) {
        errorMessage = '网络错误，请检查连接'
        statusCode = 503
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      return ApiResponseBuilder.error(errorMessage, statusCode)
    }
  }
}