# 🚀 HTMLShare v3

> 现代化代码分享平台 - 基于 Next.js 15 + Supabase + Tailwind CSS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/4zhi/htmlshare)

## ✨ 功能特色

### 🔥 核心功能
- **🎨 现代化界面** - 响应式设计，支持深色模式
- **💻 专业代码编辑器** - Monaco Editor，支持8种编程语言
- **🔍 智能语言检测** - 自动识别代码语言类型
- **🏷️ 智能标签** - 自动颜色标签系统
- **❤️ 社交互动** - 点赞、收藏、分享功能
- **📱 移动友好** - 完美适配移动设备

### 🛠️ 技术栈
- **前端**: Next.js 15 + React 18 + TypeScript 5 + Tailwind CSS 4
- **后端**: Supabase (PostgreSQL + 实时API + 认证)
- **编辑器**: Monaco Editor (VS Code引擎)
- **渲染**: Marked.js + Highlight.js + Mermaid
- **部署**: Vercel + CDN
- **监控**: Sentry (生产环境)

### 🔐 安全特性
- **认证系统** - 邮箱/密码 + GitHub OAuth
- **数据安全** - Row Level Security (RLS)
- **XSS防护** - DOMPurify内容过滤
- **HTTPS强制** - 全站加密传输
- **安全头** - CSP, XSS Protection, Frame Options

### 🏆 性能表现
- **⚡ 响应时间**: 平均 24.75ms (卓越级别)
- **📦 首页大小**: 20.8KB (优化级别)
- **🎯 可用性**: 100% (生产级别)
- **🚀 LCP**: <100ms (Web Vitals优秀)
- **💾 构建优化**: Next.js Turbopack + 智能缓存

## 🚀 快速开始

### 📋 环境要求

- **Node.js** 18.17+
- **npm** 9.0+
- **Git** 2.40+
- **Supabase** 账户

### ⚡ 快速安装

```bash
# 1. 克隆项目
git clone https://github.com/4zhi/htmlshare.git
cd htmlshare

# 2. 安装依赖
npm install

# 3. 环境配置
cp .env.example .env.local
# 编辑 .env.local 配置文件

# 4. 启动开发服务器
npm run dev
```

### 🌍 访问应用
```bash
# 开发环境
http://localhost:3000

# 生产环境
https://htmlshare.vercel.app
```

## ⚙️ 环境配置

### 📝 环境变量

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Redis 缓存 (可选)
REDIS_URL=your_redis_url

# Sentry 监控 (生产环境)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project

# 应用配置
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_MOCK_MODE=false
```

### 🗄️ 数据库设置

```bash
# 运行数据库迁移
npm run db:migrate

# 测试数据库连接
npm run db:test

# 验证系统配置
npm run verify
```

## 📁 项目结构

```
htmlshare/
├── 🎯 src/app/                     # Next.js App Router
│   ├── globals.css                # 全局样式
│   ├── layout.tsx                 # 根布局
│   ├── page.tsx                   # 首页（智能语言检测）
│   ├── auth/                      # 认证页面
│   ├── snippet/[id]/              # 代码片段页面
│   └── api/                       # API路由
├── 🧩 src/components/              # React组件
│   ├── auth/                      # 认证组件
│   ├── editor/                    # 代码编辑器
│   ├── search/                    # 搜索组件
│   └── ui/                        # 基础UI组件
├── 🔧 src/lib/                     # 工具库
│   ├── supabase.ts                # Supabase客户端
│   └── redis.ts                   # Redis客户端
├── 🛠️ src/services/                # 业务逻辑
│   ├── snippetService.ts          # 代码片段服务
│   ├── cacheService.ts            # 缓存服务
│   └── devStorageService.ts       # 开发存储服务
├── 📝 src/types/                   # TypeScript类型
│   └── database.ts                # 数据库类型定义
├── 🗄️ supabase/                    # 数据库配置
│   └── schema.sql                 # 数据库模式
├── 📜 scripts/                     # 工具脚本
│   ├── test-db.js                 # 数据库测试
│   └── migrate-enhanced.js        # 数据迁移
├── 🧪 src/__tests__/               # 测试文件
│   ├── api/                       # API测试
│   ├── components/                # 组件测试
│   └── utils/                     # 工具测试
├── 🎭 e2e/                         # E2E测试
├── 🔧 vercel.json                  # Vercel配置
└── 📄 README.md                    # 本文件
```

## 🎯 支持的语言

### 🏅 优先级排序
1. **HTML** - 网页标记语言（最高优先级）
2. **JSON** - 数据交换格式
3. **JavaScript** - 现代Web开发语言
4. **CSS** - 样式表语言
5. **TypeScript** - JavaScript超集
6. **Markdown** - 文档格式
7. **Python** - 通用编程语言
8. **Plain Text** - 纯文本（默认）

### 🎨 语法高亮
- **智能检测** - 自动识别代码类型
- **实时预览** - 代码编辑实时渲染
- **主题支持** - 多种编辑器主题

## 🔧 开发指南

### 🚀 常用命令

```bash
# 开发服务器
npm run dev              # 启动开发服务器
npm run build           # 构建生产版本
npm run start           # 启动生产服务器

# 代码质量
npm run lint            # ESLint检查
npm run type-check      # TypeScript检查

# 测试
npm run test            # 单元测试
npm run test:watch      # 监视模式测试
npm run test:coverage   # 测试覆盖率
npm run test:e2e        # E2E测试

# 数据库
npm run db:migrate      # 数据库迁移
npm run db:test         # 数据库测试

# 系统验证
npm run verify          # 系统完整性验证
npm run setup           # 环境设置向导
```

### 🏗️ 构建部署

```bash
# Vercel部署
npm run deploy          # 生产环境
npm run deploy:preview  # 预览环境

# 本地构建验证
npm run build
npm run start
```

## 🔄 升级指南

### 从HTMLShare v2升级

1. **备份现有数据**
2. **创建Supabase项目** - 参考[环境配置文档](docs/SETUP.md)
3. **运行迁移脚本** - `npm run db:migrate`
4. **验证数据完整性** - `npm run verify`
5. **部署新版本**

### 主要改进 v2 → v3

| 特性 | v2 | v3 |
|------|----|----|
| 🏗️ Next.js | 14 | **15 + Turbopack** |
| 🎨 Tailwind | v3 | **v4** |
| 🔤 TypeScript | v4 | **v5** |
| ⚡ 性能 | 良好 | **卓越 (24.75ms)** |
| 🛡️ 安全性 | 基础 | **企业级安全头** |
| 🧪 测试 | 部分覆盖 | **全覆盖 + E2E** |
| 📱 移动端 | 响应式 | **完美适配** |

## 🎯 使用场景

### 👨‍💻 开发者个人
- **代码片段管理** - 保存常用代码模板
- **技术笔记** - 记录编程学习过程
- **快速分享** - 与朋友分享代码片段

### 🏢 团队/企业
- **知识库** - 构建技术知识库
- **代码标准** - 分享编码规范和最佳实践
- **培训材料** - 创建编程培训内容

### 🎓 教育机构
- **课程材料** - 分享编程课程代码
- **作业系统** - 学生代码作业管理
- **技术博客** - 发布技术教程

## 🤝 贡献指南

我们欢迎社区贡献！请查看以下方式参与：

### 📋 贡献方式
- **🐛 报告问题**: [GitHub Issues](https://github.com/4zhi/htmlshare/issues)
- **💡 功能请求**: 在Issues中标记为"enhancement"
- **🔧 代码贡献**: 提交Pull Request
- **📖 文档改进**: 改进项目文档

### 🔨 开发流程
```bash
# 1. Fork并克隆
git clone https://github.com/your-username/htmlshare.git

# 2. 创建特性分支
git checkout -b feature/amazing-feature

# 3. 开发和测试
npm run dev
npm run test
npm run lint

# 4. 提交更改
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature

# 5. 创建Pull Request
```

## 📊 性能监控

### 📈 关键指标
- **响应时间**: 24.75ms 平均响应
- **首字节时间**: 30.29ms (TTFB)
- **页面大小**: 20.8KB 首页
- **成功率**: 100% 可用性

### 🔍 监控工具
- **Sentry**: 错误追踪和性能监控
- **Web Vitals**: 核心网络指标
- **自定义监控**: 数据库性能指标

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：

- [Next.js](https://nextjs.org/) - React全栈框架
- [Supabase](https://supabase.com/) - 开源Firebase替代方案
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code编辑器引擎
- [TypeScript](https://www.typescriptlang.org/) - JavaScript类型系统
- [Marked](https://marked.js.org/) - Markdown解析器
- [Highlight.js](https://highlightjs.org/) - 语法高亮
- [Lucide Icons](https://lucide.dev/) - 美观的图标库

## 👨‍💻 作者

**四知** - *主要开发者和维护者*

- 技术栈专精：Next.js, React, TypeScript, Tailwind CSS
- 设计理念：现代化、高性能、用户友好
- 开发目标：打造最优秀的代码分享平台

## 📞 联系方式

- **项目主页**: [GitHub](https://github.com/4zhi/htmlshare)
- **问题反馈**: [Issues](https://github.com/4zhi/htmlshare/issues)
- **在线演示**: [htmlshare.vercel.app](https://htmlshare.vercel.app)

---

<div align="center">

**🚀 开始您的代码分享之旅！**

[立即部署](https://vercel.com/new/clone?repository-url=https://github.com/4zhi/htmlshare) • [查看演示](https://htmlshare.vercel.app) • [报告问题](https://github.com/4zhi/htmlshare/issues)

**Made with ❤️ by 四知**

*HTMLShare v3 - 专业级代码分享平台*

</div>