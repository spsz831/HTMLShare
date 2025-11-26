#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 设置 HTMLShare 开发环境\n')

// 创建开发环境的 .env.local
const envContent = `# HTMLShare 开发环境配置
# 为了快速开始开发，使用模拟配置

# Supabase 配置 (开发模式 - 使用模拟数据)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Sentry 配置 (开发时禁用)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=

# Next.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-change-in-production

# 开发模式配置
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_MOCK_MODE=true
`

const envPath = path.join(process.cwd(), '.env.local')
fs.writeFileSync(envPath, envContent)

console.log('✅ 已创建开发环境配置文件 .env.local')
console.log('⚠️  注意: 当前使用模拟配置，数据不会持久化')
console.log('')
console.log('🔧 如需真实环境:')
console.log('1. 访问 https://supabase.com 创建项目')
console.log('2. 安装并启动 Redis 服务')
console.log('3. 更新 .env.local 中的真实配置')
console.log('')
console.log('🚀 现在可以启动开发服务器:')
console.log('npm run dev')