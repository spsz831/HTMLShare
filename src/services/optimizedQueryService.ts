import { createServiceClient } from '@/lib/supabase-server'
import { cacheService } from '@/services/cacheService'

export class OptimizedQueryService {
  private supabase: any

  constructor() {
    this.supabase = createServiceClient()
  }

  // 优化的分页查询
  async getPaginatedSnippets(options: {
    page?: number
    limit?: number
    language?: string
    userId?: string
    sortBy?: 'created_at' | 'view_count' | 'popularity'
    sortOrder?: 'asc' | 'desc'
    search?: string
  }) {
    const {
      page = 1,
      limit = 10,
      language,
      userId,
      sortBy = 'created_at',
      sortOrder = 'desc',
      search
    } = options

    try {
      // 检查缓存
      const cacheKey = `optimized_snippets:${JSON.stringify(options)}`
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      // 构建基础查询
      let query = this.supabase
        .from('snippets')
        .select(`
          id,
          title,
          language,
          description,
          view_count,
          created_at,
          updated_at,
          user_id,
          profiles:user_id (
            username,
            avatar_url
          ),
          snippet_tags (
            tags (
              id,
              name,
              color
            )
          )
        `)
        .eq('is_public', true)

      // 应用过滤条件
      if (language) {
        query = query.eq('language', language)
      }

      if (userId) {
        query = query.eq('user_id', userId)
      }

      // 搜索功能
      if (search) {
        // 使用全文搜索
        query = query.or(`
          title.ilike.%${search}%,
          description.ilike.%${search}%,
          content.ilike.%${search}%
        `)
      }

      // 排序
      const orderColumn = sortBy === 'popularity'
        ? 'view_count' // 简化版本，实际应该使用计算得分
        : sortBy

      query = query.order(orderColumn, { ascending: sortOrder === 'asc' })

      // 分页
      const offset = (page - 1) * limit
      query = query.range(offset, offset + limit - 1)

      const { data, error, count } = await query

      if (error) throw error

      const result = {
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        },
        error: null
      }

      // 缓存结果
      await cacheService.set(cacheKey, result, 300) // 5分钟缓存

      return result
    } catch (error: any) {
      return {
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
        error: error.message
      }
    }
  }

  // 获取热门内容（使用预计算视图）
  async getPopularSnippets(limit: number = 10) {
    try {
      // 检查缓存
      const cacheKey = `popular_snippets:${limit}`
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      // 使用视图查询
      const { data, error } = await this.supabase
        .from('popular_snippets')
        .select('*')
        .limit(limit)

      if (error) throw error

      const result = { data: data || [], error: null }

      // 缓存30分钟
      await cacheService.set(cacheKey, result, 1800)

      return result
    } catch (error: any) {
      return { data: [], error: error.message }
    }
  }

  // 获取用户统计信息
  async getUserStats(userId: string) {
    try {
      const cacheKey = `user_stats:${userId}`
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      // 使用函数查询
      const { data, error } = await this.supabase
        .rpc('get_user_stats', { user_uuid: userId })
        .single()

      if (error) throw error

      const result = { data: data || {}, error: null }

      // 缓存15分钟
      await cacheService.set(cacheKey, result, 900)

      return result
    } catch (error: any) {
      return { data: {}, error: error.message }
    }
  }

  // 获取相似内容推荐
  async getSimilarSnippets(snippetId: string, limit: number = 5) {
    try {
      const cacheKey = `similar_snippets:${snippetId}:${limit}`
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      const { data, error } = await this.supabase
        .rpc('get_similar_snippets', {
          target_snippet_id: snippetId,
          limit_count: limit
        })

      if (error) throw error

      const result = { data: data || [], error: null }

      // 缓存1小时
      await cacheService.set(cacheKey, result, 3600)

      return result
    } catch (error: any) {
      return { data: [], error: error.message }
    }
  }

  // 批量获取代码片段
  async getBatchSnippets(ids: string[]) {
    try {
      const cacheKeys = ids.map(id => `snippet:${id}`)
      const cachedResults = await Promise.all(
        cacheKeys.map(key => cacheService.get(key))
      )

      const missingIds: string[] = []
      const results: any[] = []

      cachedResults.forEach((cached, index) => {
        if (cached) {
          results[index] = cached
        } else {
          missingIds.push(ids[index])
        }
      })

      // 查询缺失的数据
      if (missingIds.length > 0) {
        const { data, error } = await this.supabase
          .from('snippets')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            ),
            snippet_tags (
              tags (
                id,
                name,
                color
              )
            )
          `)
          .in('id', missingIds)
          .eq('is_public', true)

        if (error) throw error

        // 缓存新数据并填充结果
        data?.forEach((snippet: any) => {
          const index = ids.indexOf(snippet.id)
          results[index] = snippet
          cacheService.cacheSnippet(snippet)
        })
      }

      return {
        data: results.filter(Boolean),
        error: null
      }
    } catch (error: any) {
      return {
        data: [],
        error: error.message
      }
    }
  }

  // 高效的搜索功能
  async searchSnippets(query: string, options: {
    page?: number
    limit?: number
    language?: string
  } = {}) {
    const { page = 1, limit = 10, language } = options

    try {
      const cacheKey = `search:${query}:${JSON.stringify(options)}`
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      // 使用全文搜索
      let searchQuery = this.supabase
        .from('snippets')
        .select(`
          id,
          title,
          language,
          description,
          view_count,
          like_count,
          created_at,
          ts_rank(
            to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || content),
            to_tsquery('english', $1)
          ) as rank
        `, query.replace(/\s+/g, ' & '))
        .textSearch('content', query, {
          type: 'websearch',
          config: 'english'
        })
        .eq('is_public', true)

      if (language) {
        searchQuery = searchQuery.eq('language', language)
      }

      searchQuery = searchQuery
        .order('rank', { ascending: false })
        .order('view_count', { ascending: false })
        .range((page - 1) * limit, page * limit - 1)

      const { data, error, count } = await searchQuery

      if (error) throw error

      const result = {
        data: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        },
        error: null
      }

      // 缓存搜索结果
      await cacheService.set(cacheKey, result, 600) // 10分钟

      return result
    } catch (error: any) {
      return {
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
        error: error.message
      }
    }
  }

  // 获取标签统计
  async getTagStatistics() {
    try {
      const cacheKey = 'tag_statistics'
      const cached = await cacheService.get(cacheKey)
      if (cached) {
        return cached
      }

      const { data, error } = await this.supabase
        .from('tag_statistics')
        .select('*')
        .order('snippet_count', { ascending: false })
        .limit(50)

      if (error) throw error

      const result = { data: data || [], error: null }

      // 缓存1小时
      await cacheService.set(cacheKey, result, 3600)

      return result
    } catch (error: any) {
      return { data: [], error: error.message }
    }
  }
}

// 单例实例
export const optimizedQueryService = new OptimizedQueryService()