import { createBrowserClient } from '@supabase/ssr'

let supabaseClient: any = null

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })

  return supabaseClient
}

// 重置连接（用于错误处理）
export function resetConnection() {
  supabaseClient = null
  return createClient()
}

// 检查连接健康状况
export async function checkConnectionHealth() {
  try {
    const client = createClient()
    const { data, error } = await client.from('profiles').select('count').limit(1)
    return { healthy: !error, error }
  } catch (error) {
    return { healthy: false, error }
  }
}