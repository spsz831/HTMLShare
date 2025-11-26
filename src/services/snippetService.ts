import { createClient } from '@/lib/supabase-server'
import { supabase as browserSupabase } from '@/lib/supabase'
import { cacheService } from '@/services/cacheService'
import {
  Snippet,
  CreateSnippetData,
  UpdateSnippetData,
  SearchFilters
} from '@/types/database'

// 服务端函数（用于API路由）
export class SnippetService {
  private supabase: any
  private useCache: boolean

  constructor(useServerClient = false, useCache = true) {
    this.useCache = useCache
    if (useServerClient) {
      this.initializeServerClient()
    } else {
      this.supabase = browserSupabase
    }
  }

  private async initializeServerClient() {
    try {
      this.supabase = await createClient()
    } catch (error) {
      console.error('Failed to initialize server client:', error)
      throw error
    }
  }

  // 获取代码片段列表（带缓存）
  async getSnippets(filters: SearchFilters = {}, page = 1, limit = 10) {
    try {
      // 尝试从缓存获取
      if (this.useCache) {
        const cacheKey = { ...filters, page, limit }
        const cachedData = await cacheService.getSnippetList(cacheKey)
        if (cachedData) {
          console.log('📦 Cache hit: snippet list')
          return cachedData
        }
      }
      let query = this.supabase
        .from('snippets')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          ),
          tags:snippet_tags (
            tags (
              id,
              name,
              color
            )
          )
        `)
        .eq('is_public', true)
        .order(filters.sort_by || 'created_at', {
          ascending: filters.sort_order === 'asc' ? true : false
        })

      // 应用筛选条件
      if (filters.language) {
        query = query.eq('language', filters.language)
      }

      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id)
      }

      if (filters.is_featured) {
        query = query.eq('is_featured', true)
      }

      // 分页
      const offset = (page - 1) * limit
      query = query.range(offset, offset + limit - 1)

      const { data, error, count } = await query

      if (error) throw error

      // 处理数据格式
      const snippets = data?.map((snippet: any) => ({
        ...snippet,
        tags: snippet.tags?.map((t: any) => t.tags) || []
      }))

      const result = {
        data: snippets as Snippet[],
        count: count || 0,
        error: null
      }

      // 缓存结果
      if (this.useCache) {
        const cacheKey = { ...filters, page, limit }
        await cacheService.cacheSnippetList(cacheKey, result)
      }

      return result
    } catch (error: any) {
      return {
        data: [],
        count: 0,
        error: error.message
      }
    }
  }

  // 根据ID获取代码片段（带缓存）
  async getSnippetById(id: string) {
    try {
      // 尝试从缓存获取
      if (this.useCache) {
        const cachedSnippet = await cacheService.getSnippet(id)
        if (cachedSnippet) {
          console.log('📦 Cache hit: snippet', id)
          return {
            data: cachedSnippet,
            error: null
          }
        }
      }
      const { data, error } = await this.supabase
        .from('snippets')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url,
            bio
          ),
          tags:snippet_tags (
            tags (
              id,
              name,
              color,
              description
            )
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      // 增加查看次数
      await this.supabase
        .from('snippets')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', id)

      const snippet = {
        ...data,
        tags: data.tags?.map((t: any) => t.tags) || []
      } as Snippet

      // 缓存结果
      if (this.useCache) {
        await cacheService.cacheSnippet(snippet)
      }

      return {
        data: snippet,
        error: null
      }
    } catch (error: any) {
      return {
        data: null,
        error: error.message
      }
    }
  }

  // 创建代码片段
  async createSnippet(snippetData: CreateSnippetData, userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('snippets')
        .insert([{
          ...snippetData,
          user_id: userId,
          view_count: 0
        }])
        .select()
        .single()

      if (error) throw error

      // 如果有标签，创建关联
      if (snippetData.tags && snippetData.tags.length > 0) {
        await this.addTagsToSnippet(data.id, snippetData.tags)
      }

      return {
        data: data as Snippet,
        error: null
      }
    } catch (error: any) {
      return {
        data: null,
        error: error.message
      }
    }
  }

  // 更新代码片段
  async updateSnippet(id: string, updates: UpdateSnippetData, userId: string) {
    try {
      // 检查权限
      const { data: snippet } = await this.supabase
        .from('snippets')
        .select('user_id')
        .eq('id', id)
        .single()

      if (snippet?.user_id !== userId) {
        throw new Error('无权限修改此代码片段')
      }

      const { data, error } = await this.supabase
        .from('snippets')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // 更新标签关联
      if (updates.tags !== undefined) {
        await this.updateSnippetTags(id, updates.tags)
      }

      return {
        data: data as Snippet,
        error: null
      }
    } catch (error: any) {
      return {
        data: null,
        error: error.message
      }
    }
  }

  // 删除代码片段
  async deleteSnippet(id: string, userId: string) {
    try {
      // 检查权限
      const { data: snippet } = await this.supabase
        .from('snippets')
        .select('user_id')
        .eq('id', id)
        .single()

      if (snippet?.user_id !== userId) {
        throw new Error('无权限删除此代码片段')
      }

      const { error } = await this.supabase
        .from('snippets')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  // 搜索代码片段
  async searchSnippets(query: string, filters: SearchFilters = {}, page = 1, limit = 10) {
    try {
      let searchQuery = this.supabase
        .from('snippets')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          ),
          tags:snippet_tags (
            tags (
              id,
              name,
              color
            )
          )
        `)
        .eq('is_public', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,content.ilike.%${query}%`)

      // 应用筛选条件
      if (filters.language) {
        searchQuery = searchQuery.eq('language', filters.language)
      }

      if (filters.user_id) {
        searchQuery = searchQuery.eq('user_id', filters.user_id)
      }

      // 分页和排序
      const offset = (page - 1) * limit
      searchQuery = searchQuery
        .order(filters.sort_by || 'created_at', {
          ascending: filters.sort_order === 'asc' ? true : false
        })
        .range(offset, offset + limit - 1)

      const { data, error, count } = await searchQuery

      if (error) throw error

      const snippets = data?.map((snippet: any) => ({
        ...snippet,
        tags: snippet.tags?.map((t: any) => t.tags) || []
      }))

      return {
        data: snippets as Snippet[],
        count: count || 0,
        error: null
      }
    } catch (error: any) {
      return {
        data: [],
        count: 0,
        error: error.message
      }
    }
  }


  // 添加标签到代码片段
  private async addTagsToSnippet(snippetId: string, tagNames: string[]) {
    for (const tagName of tagNames) {
      // 获取或创建标签
      let { data: tag } = await this.supabase
        .from('tags')
        .select('*')
        .eq('name', tagName)
        .single()

      if (!tag) {
        const { data: newTag } = await this.supabase
          .from('tags')
          .insert([{
            name: tagName,
            color: this.getRandomColor()
          }])
          .select()
          .single()

        tag = newTag
      }

      // 创建关联
      if (tag) {
        await this.supabase
          .from('snippet_tags')
          .insert([{ snippet_id: snippetId, tag_id: tag.id }])
      }
    }
  }

  // 更新代码片段标签
  private async updateSnippetTags(snippetId: string, tagNames: string[]) {
    // 删除现有关联
    await this.supabase
      .from('snippet_tags')
      .delete()
      .eq('snippet_id', snippetId)

    // 添加新关联
    if (tagNames.length > 0) {
      await this.addTagsToSnippet(snippetId, tagNames)
    }
  }

  // 生成随机颜色
  private getRandomColor(): string {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
      '#ec4899', '#f43f5e'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
}

export const snippetService = new SnippetService()