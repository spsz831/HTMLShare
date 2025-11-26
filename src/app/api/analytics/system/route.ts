import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { dbMonitor } from '@/utils/performanceUtils'

export async function GET(request: NextRequest) {
  try {
    const redis = getRedisClient()

    if (!redis) {
      return NextResponse.json({ error: 'Redis 不可用' }, { status: 503 })
    }

    // 获取数据库监控指标
    const dbMetrics = dbMonitor.getMetrics()

    // 获取 Redis 连接信息
    const redisInfo = await redis.info('memory')
    const keyspace = await redis.info('keyspace')

    // 模拟系统指标（实际项目中应该从真实数据源获取）
    const systemMetrics = {
      responseTime: dbMetrics.averageQueryTime,
      errorRate: (dbMetrics.queryCount > 0 ? (dbMetrics.slowQueries / dbMetrics.queryCount) * 100 : 0),
      cacheHitRate: dbMetrics.cacheHitRate * 100,
      activeConnections: await getActiveConnectionsCount(),
      memoryUsage: parseRedisMemoryInfo(redisInfo),
      redisKeys: parseRedisKeyspace(keyspace)
    }

    return NextResponse.json(systemMetrics)

  } catch (error: any) {
    console.error('System metrics API error:', error)
    return NextResponse.json(
      { error: '获取系统指标失败' },
      { status: 500 }
    )
  }
}

// 获取活跃连接数（模拟）
async function getActiveConnectionsCount(): Promise<number> {
  try {
    // 这里应该从实际的连接池或监控系统获取
    // 暂时返回模拟数据
    return Math.floor(Math.random() * 50) + 10
  } catch {
    return 0
  }
}

// 解析 Redis 内存信息
function parseRedisMemoryInfo(memoryInfo: string): {
  used: number
  peak: number
  percentage: number
} {
  const lines = memoryInfo.split('\n')
  let used = 0
  let peak = 0

  for (const line of lines) {
    if (line.startsWith('used_memory:')) {
      used = parseInt(line.split(':')[1]) / 1024 / 1024 // 转换为 MB
    } else if (line.startsWith('used_memory_peak:')) {
      peak = parseInt(line.split(':')[1]) / 1024 / 1024 // 转换为 MB
    }
  }

  return {
    used: Math.round(used * 100) / 100,
    peak: Math.round(peak * 100) / 100,
    percentage: peak > 0 ? Math.round((used / peak) * 100) : 0
  }
}

// 解析 Redis 键空间信息
function parseRedisKeyspace(keyspace: string): {
  databases: number
  totalKeys: number
  expires: number
} {
  const lines = keyspace.split('\n')
  let databases = 0
  let totalKeys = 0
  let expires = 0

  for (const line of lines) {
    if (line.startsWith('db')) {
      databases++
      const match = line.match(/keys=(\d+).*expires=(\d+)/)
      if (match) {
        totalKeys += parseInt(match[1])
        expires += parseInt(match[2])
      }
    }
  }

  return { databases, totalKeys, expires }
}