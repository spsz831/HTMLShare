# HTMLShare

> 一个简单、快速的HTML分享工具 - 支持在线编辑和实时预览

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.0+-orange.svg)](https://astro.build)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-D1-blue.svg)](https://www.cloudflare.com)
[![Live Demo](https://img.shields.io/badge/Demo-htmlshare.top-success.svg)](https://htmlshare.top)

## ✨ 特性

- 🚀 **快速分享** - 粘贴HTML代码，一键生成分享链接
- 📁 **文件上传** - 支持直接上传HTML文件
- 🔗 **唯一链接** - 自动生成随机、安全的分享URL
- 🌐 **无需注册** - 免费使用，无需账户
- ⚡ **边缘部署** - 基于Cloudflare Pages，全球加速
- 🛡️ **基础安全** - 自动过滤危险脚本标签

## 🛠️ 技术栈

- **前端框架**: [Astro](https://astro.build/) - 现代静态站点生成器
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化CSS框架
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - SQLite边缘数据库
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/) - 边缘部署平台
- **语言**: TypeScript

## 🌐 在线体验

🔗 **立即体验**: [https://htmlshare.top](https://htmlshare.top)

HTMLShare 是一个基于 Cloudflare Pages 部署的现代化HTML分享平台，提供：

- 📝 **在线编辑器** - 支持语法高亮的HTML编辑
- 👁️ **实时预览** - 边写边看，所见即所得
- 🔗 **一键分享** - 生成唯一链接，轻松分享作品
- 🚀 **全球加速** - 基于Cloudflare CDN，访问速度极快

## 📋 使用方法

1. **粘贴HTML代码** 或 **上传HTML文件**
2. 点击 **生成链接** 按钮
3. **分享生成的URL** 给他人

## 💻 本地开发

### 前置要求

- Node.js 18+
- npm/yarn/pnpm

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/spsz831/HTMLShare.git
cd HTMLShare

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 项目结构

```
HTMLShare/
├── src/
│   ├── pages/
│   │   ├── api/           # API路由
│   │   ├── view/          # HTML查看页面
│   │   ├── index.astro    # 主页
│   │   └── demo.astro     # 演示页面
│   ├── lib/
│   │   └── database.ts    # 数据库服务
│   └── styles/            # 样式文件
├── public/                # 静态资源
├── schema.sql            # 数据库模式
└── wrangler.toml         # Cloudflare配置
```

## 🌐 部署到Cloudflare

### 1. 创建D1数据库

```bash
# 创建数据库
npm run db:create

# 应用数据库模式
npm run db:migrate
```

### 2. 配置环境

更新 `wrangler.toml` 中的数据库ID：

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "htmlshare-db"
database_id = "your-database-id"
```

### 3. 部署应用

```bash
# 构建并部署
npm run deploy
```

## 📡 API接口

### 创建分享

```http
POST /api/pages
Content-Type: application/json

{
  "title": "页面标题",
  "content": "<!DOCTYPE html><html>...</html>",
  "description": "页面描述（可选）"
}
```

**响应:**
```json
{
  "success": true,
  "data": {
    "url_id": "abc123xyz",
    "title": "页面标题",
    "description": "页面描述",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 获取页面列表

```http
GET /api/pages?limit=10
```

### 查看分享页面

```http
GET /view/{url_id}
```

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件：

```bash
# 开发环境配置
NODE_ENV=development
PUBLIC_APP_URL=http://localhost:3000
```

### 数据库架构

```sql
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'html',
  description TEXT,
  view_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📝 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Astro](https://astro.build/) - 出色的静态站点生成器
- [Cloudflare](https://cloudflare.com/) - 强大的边缘计算平台
- [Tailwind CSS](https://tailwindcss.com/) - 优秀的CSS框架

---

⭐ **如果这个项目对你有帮助，请给它一个星标！**

🌐 **在线体验**: [https://htmlshare.top](https://htmlshare.top)