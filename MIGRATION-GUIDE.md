# HTMLShare Astro - 迁移指南

## 🚀 从 Next.js + Supabase 到 Astro + Cloudflare D1

### 第一步：准备新项目

1. **备份现有数据**
```bash
# 创建数据备份
npm run db:backup  # 如果有的话
```

2. **设置新的项目目录**
```bash
mkdir htmlshare-astro
cd htmlshare-astro

# 复制新的配置文件
cp ../package.json.new package.json
cp ../astro.config.new.mjs astro.config.mjs
cp ../wrangler.new.toml wrangler.toml
cp ../schema.new.sql schema.sql
```

### 第二步：安装依赖

```bash
npm install
```

### 第三步：设置 Cloudflare D1 数据库

1. **创建 D1 数据库**
```bash
npx wrangler d1 create htmlshare-db
```

2. **更新 wrangler.toml**
```toml
# 将返回的 database_id 更新到 wrangler.toml 中
database_id = "your-actual-database-id"
```

3. **创建数据库表**
```bash
npx wrangler d1 execute htmlshare-db --file=schema.sql
```

### 第四步：迁移现有数据

1. **设置环境变量**
```bash
export SUPABASE_URL="your-supabase-url"
export SUPABASE_ANON_KEY="your-supabase-anon-key"
```

2. **运行迁移脚本**
```bash
node scripts/migrate-from-supabase.js
```

3. **执行数据迁移**
```bash
npx wrangler d1 execute htmlshare-db --file=migration-data.sql
```

### 第五步：测试本地环境

```bash
npm run dev
```

访问 `http://localhost:3000` 测试功能：
- ✅ 上传 HTML 内容
- ✅ 生成分享链接
- ✅ 直接渲染 HTML（无 iframe）
- ✅ 支持 `<div class="card">` 等CSS类

### 第六步：部署到 Cloudflare Pages

1. **构建项目**
```bash
npm run build
```

2. **部署到 Cloudflare Pages**
```bash
npx wrangler pages publish dist
```

或者连接 GitHub 仓库进行自动部署。

### 第七步：验证迁移

1. **测试核心功能**
   - 创建新的 HTML 分享
   - 访问迁移的旧链接
   - 检查数据完整性

2. **性能对比**
   - 页面加载速度
   - 渲染性能
   - 边缘网络响应

### 架构对比

| 功能 | 旧架构 (Next.js) | 新架构 (Astro) |
|------|------------------|-----------------|
| 框架 | Next.js 15 | Astro 4 |
| 数据库 | Supabase (PostgreSQL) | Cloudflare D1 (SQLite) |
| 部署 | Vercel | Cloudflare Pages |
| 渲染 | React + dangerouslySetInnerHTML | 直接HTML响应 |
| 认证 | Supabase Auth | 无需认证 |
| CDN | Vercel Edge | Cloudflare Global Network |

### 主要改进

1. **🚀 更快的加载速度** - 边缘计算 + 直接HTML渲染
2. **💰 更低的成本** - Cloudflare 免费层级足够使用
3. **🎯 更简洁的架构** - 专注核心功能
4. **🔧 更好的HTML支持** - 完全兼容原生HTML
5. **🌍 更广的覆盖范围** - Cloudflare 全球网络

### 注意事项

- ⚠️ 用户系统功能将被移除（可后续添加）
- ⚠️ 复杂的分析功能将被简化
- ⚠️ 确保备份所有重要数据
- ⚠️ 测试所有迁移的链接

### 回滚计划

如果需要回滚到旧系统：
1. 保留原有的 Next.js 项目
2. 使用 Cloudflare 的 DNS 切换
3. 从 D1 导出数据回 Supabase（如需要）