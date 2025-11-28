# HTMLShare Astro

基于 **Astro + Cloudflare D1** 重构的快速HTML分享平台，专注于核心���能，提供极致的性能体验。

## ✨ 特性

- 🚀 **极速渲染** - 直接HTML渲染，无iframe延迟
- 🌍 **全球部署** - Cloudflare Pages + Edge Network
- 📦 **轻量架构** - Astro + D1，专注核心功能
- 🔒 **安全可靠** - 内容清理 + CSP安全策略
- 💰 **成本优化** - Cloudflare 免费层级足够使用
- ⚡ **边缘计算** - 全球200+数据中心响应

## 🏗️ 技术栈

- **前端框架**: [Astro](https://astro.build/) - 零JS运行时
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - 边缘SQLite
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/) - 全球CDN
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化CSS

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo>
cd htmlshare-astro
npm install
```

### 2. 设置 Cloudflare D1

```bash
# 创建数据库
npx wrangler d1 create htmlshare-db

# 更新 wrangler.toml 中的 database_id

# 创建表结构
npx wrangler d1 execute htmlshare-db --file=schema.sql
```

### 3. 本地开发

```bash
npm run dev
```

访问 `http://localhost:3000`

### 4. 部署

```bash
npm run build
npm run deploy
```

## 📊 架构对比

| 方面 | 旧架构 (Next.js) | 新架构 (Astro) |
|------|------------------|-----------------|
| **性能** | React 水合 + 客户端渲染 | 零JS + 边缘渲染 |
| **成本** | Vercel Pro ($20/月) | Cloudflare 免费 |
| **复杂度** | 认证 + 用户系统 + 分析 | 专注HTML分享 |
| **速度** | ~800ms TTFB | ~100ms TTFB |
| **覆盖** | Vercel Edge (14个区域) | Cloudflare (200+个区域) |

## 🎯 核心功能

### HTML内容分享
- ✅ 支持完整HTML文档
- ✅ 智能内容检测
- ✅ 自动生成分享链接
- ✅ 访问量统计

### 直接渲染
- ✅ 无iframe，完全原生HTML
- ✅ 支持所有CSS类 (如 `.card`)
- ✅ 保持完整样式兼容性
- ✅ SEO友好

### 安全特性
- ✅ 内容清理和验证
- ✅ CSP安全策略
- ✅ 防XSS攻击
- ✅ 访问频率限制

## 🔧 配置

### 环境变量

```bash
# Cloudflare
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# 迁移用（如需要）
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### wrangler.toml

```toml
name = "htmlshare-astro"
compatibility_date = "2024-01-01"

[[env.production.d1_databases]]
binding = "DB"
database_name = "htmlshare-db"
database_id = "your-database-id"
```

## 📈 性能优化

### 边缘计算优势
- **全球缓存**: 静态资源自动缓存
- **智能路由**: 就近访问数据中心
- **零延迟启动**: 无冷启动时间

### 数据库优化
- **索引策略**: url_id, created_at 等关键字段
- **缓存机制**: 1小时页面缓存
- **��接池**: D1自动管理

## 🛠️ 开发

### 本地调试

```bash
# 启动开发服务器
npm run dev

# 查看数据库
npx wrangler d1 execute htmlshare-db --command="SELECT * FROM pages LIMIT 5"

# 本地构建测试
npm run build && npm run preview
```

### 数据迁移

如果从旧系统迁移：

```bash
# 设置环境变量
export SUPABASE_URL="your-url"
export SUPABASE_ANON_KEY="your-key"

# 运行迁移脚本
node scripts/migrate-from-supabase.js

# 执行迁移
npx wrangler d1 execute htmlshare-db --file=migration-data.sql
```

## 📝 API文档

### 创建页面
```
POST /api/pages
Content-Type: application/json

{
  "title": "My HTML Page",
  "content": "<!DOCTYPE html>...",
  "description": "Optional description"
}
```

### 获取页面信息
```
GET /api/pages/{id}
```

### 访问页面
```
GET /view/{id}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**HTMLShare v2.0** - 重新定义HTML分享体验 🚀