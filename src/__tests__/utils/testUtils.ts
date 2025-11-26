import { LanguageType } from '@/types/database'

// 测试工具函数
export const mockSnippet = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Test Snippet',
  content: 'console.log("Hello World")',
  language: 'javascript' as LanguageType,
  description: 'A test snippet',
  user_id: '123e4567-e89b-12d3-a456-426614174001',
  is_public: true,
  view_count: 10,
  like_count: 5,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  tags: [
    { id: '1', name: 'test', color: '#blue' },
    { id: '2', name: 'example', color: '#green' }
  ],
  profiles: {
    username: 'testuser',
    avatar_url: 'https://example.com/avatar.png'
  }
}

export const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  email: 'test@example.com',
  username: 'testuser',
  full_name: 'Test User',
  avatar_url: 'https://example.com/avatar.png',
  bio: 'Test bio',
  created_at: '2024-01-01T00:00:00Z'
}

export const mockSearchFilters = {
  language: 'javascript' as LanguageType,
  sort_by: 'created_at' as const,
  sort_order: 'desc' as const,
  user_id: undefined,
  is_featured: false
}

// Mock Supabase client
export const mockSupabaseClient: any = {
  from: jest.fn((): any => mockSupabaseClient),
  select: jest.fn(() => mockSupabaseClient),
  insert: jest.fn(() => mockSupabaseClient),
  update: jest.fn(() => mockSupabaseClient),
  delete: jest.fn(() => mockSupabaseClient),
  eq: jest.fn(() => mockSupabaseClient),
  order: jest.fn(() => mockSupabaseClient),
  range: jest.fn(() => mockSupabaseClient),
  single: jest.fn(() => Promise.resolve({ data: mockSnippet, error: null })),
  auth: {
    getUser: jest.fn(() => Promise.resolve({
      data: { user: mockUser },
      error: null
    })),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn()
  },
  rpc: jest.fn(),
  textSearch: jest.fn(() => mockSupabaseClient)
}

// Mock Redis client
export const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
  setex: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  keys: jest.fn(),
  disconnect: jest.fn()
}

// Mock fetch responses
export const mockFetchSuccess = (data: any) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
    status: 200,
    statusText: 'OK'
  } as Response)
}

export const mockFetchError = (status = 500, statusText = 'Internal Server Error') => {
  return Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ error: 'Server error' }),
    status,
    statusText
  } as Response)
}

// Test utilities
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const createMockComponent = (name: string, props: any = {}) => {
  return function MockComponent(componentProps: any) {
    // 返回一个简单的模拟对象而不是JSX
    return {
      type: 'div',
      props: {
        'data-testid': `mock-${name.toLowerCase()}`,
        ...props,
        ...componentProps,
        children: `${name} Mock Component`
      }
    }
  }
}

// Performance testing utilities
export const measurePerformance = async (fn: () => Promise<any>) => {
  const start = performance.now()
  await fn()
  const end = performance.now()
  return end - start
}

export const expectPerformance = (duration: number, maxDuration: number) => {
  expect(duration).toBeLessThan(maxDuration)
}