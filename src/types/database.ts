export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  created_at: string
  updated_at: string
}

export interface Snippet {
  id: string
  title: string
  content: string
  language: string
  description: string | null
  user_id: string | null
  is_public: boolean
  is_featured: boolean
  view_count: number
  created_at: string
  updated_at: string
  profiles?: Profile
  tags?: Tag[]
}

export interface Tag {
  id: string
  name: string
  color: string
  description: string | null
  created_at: string
}

export interface Comment {
  id: string
  content: string
  user_id: string
  snippet_id: string
  parent_id: string | null
  created_at: string
  updated_at: string
  profiles?: Profile
  replies?: Comment[]
}

export type LanguageType =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'html'
  | 'css'
  | 'react'
  | 'vue'
  | 'angular'
  | 'node'
  | 'go'
  | 'rust'
  | 'java'
  | 'cpp'
  | 'c'
  | 'php'
  | 'ruby'
  | 'bash'
  | 'sql'
  | 'json'
  | 'yaml'
  | 'markdown'
  | 'plaintext'

export interface CreateSnippetData {
  title: string
  content: string
  language: LanguageType
  description?: string
  is_public?: boolean
  tags?: string[]
}

export interface UpdateSnippetData {
  title?: string
  content?: string
  language?: LanguageType
  description?: string
  is_public?: boolean
  tags?: string[]
}

export interface SearchFilters {
  language?: LanguageType
  tags?: string[]
  user_id?: string
  is_featured?: boolean
  sort_by?: 'created_at' | 'updated_at' | 'view_count'
  sort_order?: 'asc' | 'desc'
}