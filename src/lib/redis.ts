import Redis from 'ioredis'

let redis: Redis | null = null

// Redis 配置
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  connectTimeout: 10000,
  commandTimeout: 5000,
}

// 创建Redis连接
export function createRedisClient(): Redis {
  if (redis) {
    return redis
  }

  redis = new Redis(redisConfig)

  // 连接事件监听
  redis.on('connect', () => {
    console.log('✅ Redis connected')
  })

  redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err)
  })

  redis.on('close', () => {
    console.warn('⚠️ Redis connection closed')
  })

  redis.on('reconnecting', (delay: number) => {
    console.log(`🔄 Redis reconnecting in ${delay}ms`)
  })

  return redis
}

// 获取Redis客户端
export function getRedisClient(): Redis | null {
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