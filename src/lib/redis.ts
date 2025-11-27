import Redis from 'ioredis'

let redis: Redis | null = null
let redisEnabled = false

// 检查Redis是否可用
function isRedisConfigured(): boolean {
  return Boolean(process.env.REDIS_URL || process.env.REDIS_HOST)
}

// Redis 配置
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 2,
  retryDelayOnClusterDown: 300,
  lazyConnect: true,
  connectTimeout: 5000,
  commandTimeout: 3000,
  // 禁用自动重连以避免开发环境的连接问题
  retryPolicy: (times: number) => {
    if (times > 3) {
      console.warn('⚠️ Redis连接失败，禁用缓存功能')
      return null // 停止重试
    }
    return Math.min(times * 50, 2000)
  }
}

// 创建Redis连接
export function createRedisClient(): Redis | null {
  if (redis) {
    return redis
  }

  // 如果没有配置Redis，则跳过连接
  if (!isRedisConfigured()) {
    console.log('ℹ️ Redis未配置，使用内存缓存模式')
    return null
  }

  try {
    redis = new Redis(redisConfig)

    // 连接事件监听
    redis.on('connect', () => {
      console.log('✅ Redis connected')
      redisEnabled = true
    })

    redis.on('error', (err) => {
      console.error('❌ Redis connection error:', err)
      redisEnabled = false
    })

    redis.on('close', () => {
      console.warn('⚠️ Redis connection closed')
      redisEnabled = false
    })

    redis.on('reconnecting', (delay: number) => {
      console.log(`🔄 Redis reconnecting in ${delay}ms`)
    })

    return redis
  } catch (error) {
    console.error('Failed to create Redis client:', error)
    return null
  }
}

// 获取Redis客户端
export function getRedisClient(): Redis | null {
  if (!redisEnabled && redis) {
    // 如果Redis连接失败，返回null
    return null
  }

  if (!redis) {
    try {
      return createRedisClient()
    } catch (error) {
      console.error('Failed to create Redis client:', error)
      return null
    }
  }
  return redis
}

// 缓存键生成器
export const CacheKeys = {
  snippet: (id: string) => `snippet:${id}`,
  snippetList: (filters: string) => `snippets:list:${filters}`,
  userSnippets: (userId: string) => `user:${userId}:snippets`,
  popularSnippets: () => 'snippets:popular',
  searchResults: (query: string, page: number) => `search:${query}:page:${page}`,
  userProfile: (userId: string) => `user:${userId}:profile`,
  snippetStats: (id: string) => `snippet:${id}:stats`,
  tagCloud: () => 'tags:cloud',
}

// 缓存时间（秒）
export const CacheTTL = {
  snippet: 3600,        // 1小时
  snippetList: 300,     // 5分钟
  popularSnippets: 1800, // 30分钟
  searchResults: 600,   // 10分钟
  userProfile: 1800,    // 30分钟
  snippetStats: 300,    // 5分钟
  tagCloud: 3600,       // 1小时
}

// 关闭连接
export function closeRedisConnection(): void {
  if (redis) {
    redis.disconnect()
    redis = null
  }
}