// 开发模式 - 禁用外部服务的 Redis 配置
import { Redis } from 'ioredis'

let redisClient: Redis | null = null

export function getRedisClient(): Redis | null {
  // 在开发模式下，如果没有真实的Redis服务，返回 null
  if (process.env.NODE_ENV === 'development' && !process.env.REDIS_ENABLED) {
    console.log('🔧 Redis disabled in development mode')
    return null
  }

  if (!redisClient) {
    try {
      redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB || '0'),
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      })

      redisClient.on('error', (error) => {
        console.error('❌ Redis connection error:', error)
      })

      redisClient.on('close', () => {
        console.warn('⚠️ Redis connection closed')
      })

      redisClient.on('reconnecting', (delay: number) => {
        console.log(`🔄 Redis reconnecting in ${delay}ms`)
      })

      redisClient.on('connect', () => {
        console.log('✅ Redis connected successfully')
      })

    } catch (error) {
      console.error('❌ Failed to initialize Redis:', error)
      redisClient = null
    }
  }

  return redisClient
}

// 清理连接的函数
export async function closeRedisConnection() {
  if (redisClient) {
    await redisClient.disconnect()
    redisClient = null
  }
}