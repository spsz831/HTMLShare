// 开发模式内存存储服务
interface DevSnippet {
  id: string
  title: string
  content: string
  language: string
  description: string | null
  is_public: boolean
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
  user_id: string | null
}

class DevStorageService {
  private snippets: Map<string, DevSnippet> = new Map()

  // 生成唯一ID
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // 创建代码片段
  async createSnippet(data: {
    title?: string
    content: string
    language: string
    description?: string | null
    is_public?: boolean
  }): Promise<{ snippet: DevSnippet; error?: string }> {
    try {
      const id = this.generateId()
      const now = new Date().toISOString()

      const snippet: DevSnippet = {
        id,
        title: data.title || `${data.language} 代码片段`,
        content: data.content.trim(),
        language: data.language,
        description: data.description || null,
        is_public: data.is_public !== false,
        view_count: 0,
        like_count: 0,
        created_at: now,
        updated_at: now,
        user_id: null
      }

      this.snippets.set(id, snippet)

      console.log(`📝 Created snippet: ${id} (${data.language}) - Total: ${this.snippets.size}`)
      return { snippet }
    } catch (error: any) {
      return { snippet: null as any, error: error.message }
    }
  }

  // 获取代码片段
  async getSnippet(id: string): Promise<{ snippet: DevSnippet | null; error?: string }> {
    try {
      const snippet = this.snippets.get(id)

      if (!snippet) {
        console.log(`❌ Snippet not found: ${id} - Available: [${Array.from(this.snippets.keys()).join(', ')}]`)
        return { snippet: null, error: '代码片段未找到' }
      }

      // 增加浏览数
      snippet.view_count += 1
      this.snippets.set(id, snippet)

      console.log(`👀 Viewed snippet: ${id} (views: ${snippet.view_count})`)
      return { snippet }
    } catch (error: any) {
      return { snippet: null, error: error.message }
    }
  }

  // 获取所有代码片段列表
  async getSnippets(filters: any = {}, page = 1, limit = 10): Promise<{
    data: DevSnippet[]
    count: number
    error?: string
  }> {
    try {
      let snippetArray = Array.from(this.snippets.values())

      // 过滤
      if (filters.language) {
        snippetArray = snippetArray.filter(s => s.language === filters.language)
      }

      if (filters.is_public !== undefined) {
        snippetArray = snippetArray.filter(s => s.is_public === filters.is_public)
      }

      // 排序
      const sortBy = filters.sort_by || 'created_at'
      const sortOrder = filters.sort_order || 'desc'

      snippetArray.sort((a, b) => {
        const aValue = (a as any)[sortBy]
        const bValue = (b as any)[sortBy]

        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1
        } else {
          return aValue > bValue ? 1 : -1
        }
      })

      // 分页
      const offset = (page - 1) * limit
      const paginatedData = snippetArray.slice(offset, offset + limit)

      return {
        data: paginatedData,
        count: snippetArray.length
      }
    } catch (error: any) {
      return { data: [], count: 0, error: error.message }
    }
  }

  // 搜索代码片段
  async searchSnippets(query: string, filters: any = {}, page = 1, limit = 10): Promise<{
    data: DevSnippet[]
    count: number
    error?: string
  }> {
    try {
      let snippetArray = Array.from(this.snippets.values())

      // 搜索过滤
      const searchTerm = query.toLowerCase()
      snippetArray = snippetArray.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm) ||
        snippet.content.toLowerCase().includes(searchTerm) ||
        snippet.language.toLowerCase().includes(searchTerm) ||
        (snippet.description && snippet.description.toLowerCase().includes(searchTerm))
      )

      // 应用其他过滤器
      if (filters.language) {
        snippetArray = snippetArray.filter(s => s.language === filters.language)
      }

      // 分页
      const offset = (page - 1) * limit
      const paginatedData = snippetArray.slice(offset, offset + limit)

      return {
        data: paginatedData,
        count: snippetArray.length
      }
    } catch (error: any) {
      return { data: [], count: 0, error: error.message }
    }
  }

  // 清除所有数据（测试用）
  clear(): void {
    this.snippets.clear()
    console.log('🗑️ Cleared all snippets from dev storage')
  }

  // 获取存储统计
  getStats(): { total: number, byLanguage: Record<string, number> } {
    const snippetArray = Array.from(this.snippets.values())
    const byLanguage: Record<string, number> = {}

    snippetArray.forEach(snippet => {
      byLanguage[snippet.language] = (byLanguage[snippet.language] || 0) + 1
    })

    return {
      total: snippetArray.length,
      byLanguage
    }
  }
}

// 全局单例实例 - 使用 globalThis 确保在 Next.js 热重载时保持一致
const GLOBAL_KEY = '__htmlshare_dev_storage__'

function getDevStorageInstance(): DevStorageService {
  if (!(globalThis as any)[GLOBAL_KEY]) {
    (globalThis as any)[GLOBAL_KEY] = new DevStorageService()
    console.log('🔧 Initialized new DevStorageService instance')
  }
  return (globalThis as any)[GLOBAL_KEY]
}

export const devStorage = getDevStorageInstance()

// 开发模式检测函数
export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development' &&
         (process.env.NEXT_PUBLIC_MOCK_MODE === 'true' ||
          Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('localhost')))
}