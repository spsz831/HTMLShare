#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

console.log('🔍 HTMLShare 环境变量检查\n')

const requiredVars = {
  'Supabase URL': 'NEXT_PUBLIC_SUPABASE_URL',
  'Supabase Anon Key': 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'Redis Host': 'REDIS_HOST',
  'Redis Port': 'REDIS_PORT',
  'NextAuth URL': 'NEXTAUTH_URL',
  'NextAuth Secret': 'NEXTAUTH_SECRET'
}

const optionalVars = {
  'Sentry DSN': 'NEXT_PUBLIC_SENTRY_DSN',
  'Service Role Key': 'SUPABASE_SERVICE_ROLE_KEY'
}

let hasErrors = false
let warnings = 0

console.log('✅ 必需的环境变量:')
for (const [name, key] of Object.entries(requiredVars)) {
  const value = process.env[key]
  if (!value || value.includes('your-') || value.includes('your_')) {
    console.log(`❌ ${name} (${key}): 未配置或使用默认值`)
    hasErrors = true
  } else {
    console.log(`✅ ${name} (${key}): 已配置`)
  }
}

console.log('\n⚠️  可选的环境变量:')
for (const [name, key] of Object.entries(optionalVars)) {
  const value = process.env[key]
  if (!value || value.includes('your-') || value.includes('your_')) {
    console.log(`⚠️  ${name} (${key}): 未配置 (可选)`)
    warnings++
  } else {
    console.log(`✅ ${name} (${key}): 已配置`)
  }
}

console.log('\n📋 配置建议:')

if (hasErrors) {
  console.log('❌ 发现必需的环境变量未配置!')
  console.log('\n📝 请按以下步骤配置:')
  console.log('1. 访问 https://supabase.com 创建新项目')
  console.log('2. 复制项目 URL 和 anon key')
  console.log('3. 更新 .env.local 文件中的相应值')
  console.log('4. 可选: 配置 Redis 和 Sentry')
}

if (warnings > 0) {
  console.log(`⚠️  有 ${warnings} 个可选配置未设置，应用可以正常运行但某些功能可能受限`)
}

if (!hasErrors) {
  console.log('✅ 基本配置完成！可以启动开发服务器')
}

console.log('\n🚀 下一步:')
console.log('- npm run dev (启动开发服务器)')
console.log('- npm run build (测试生产构建)')
console.log('- npm run test (运行测试)')

process.exit(hasErrors ? 1 : 0)