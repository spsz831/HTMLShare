# Cloudflare Pages 构建设置

## 构建配置
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: `/`
- **Node.js version**: 18.x

## 环境变量设置
在 Cloudflare Dashboard → Pages → 你的项目 → Settings → Environment variables 中添加：

### Production 环境变量：
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://你的域名.com
SUPABASE_URL=你的Supabase项目URL
SUPABASE_ANON_KEY=你的Supabase匿名密钥
SUPABASE_SERVICE_KEY=你的Supabase服务密钥
```

### Preview 环境变量：
```
NODE_ENV=development
NEXT_PUBLIC_APP_URL=https://preview.你的域名.com
# 其他环境变量同上
```

## 自定义域名配置
1. 在 Cloudflare Pages 项目设置中添加自定义域名
2. 配置 DNS 记录（下面详述）