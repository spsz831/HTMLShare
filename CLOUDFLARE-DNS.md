# Cloudflare DNS 配置指南

## 步骤1: 域名添加到 Cloudflare
1. 登录 Cloudflare Dashboard
2. 点击 "Add a Site"
3. 输入你的域名（如 yourdomain.com）
4. 选择 Free 计划
5. 复制提供的 Nameservers

## 步骤2: 修改域名DNS服务器
在你的域名注册商（阿里云、腾讯云等）设置中：
1. 找到 DNS 管理或域名解析
2. 修改 Nameservers 为 Cloudflare 提供的：
   - 例如：ns1.cloudflare.com
   - 例如：ns2.cloudflare.com

## 步骤3: Cloudflare DNS 记录配置

### 主域名记录：
```
类型: CNAME
名称: @
目标: your-project.pages.dev
代理状态: ✅ 已代理（橙色云朵）
```

### WWW子域名记录：
```
类型: CNAME
名称: www
目标: your-project.pages.dev
代理状态: ✅ 已代理（橙色云朵）
```

### API子域名（可选）：
```
类型: CNAME
名称: api
目标: your-project.pages.dev
代理状态: ✅ 已代理（橙色云朵）
```

## 步骤4: Cloudflare Pages 自定义域名
1. 进入 Cloudflare Pages → 你的项目
2. 点击 "Custom domains" 标签
3. 添加域名：yourdomain.com
4. 添加域名：www.yourdomain.com

## 步骤5: 国内访问优化
在 Cloudflare → Speed → Optimization 中启用：
- ✅ Auto Minify (CSS, HTML, JS)
- ✅ Brotli
- ✅ Early Hints
- ✅ Rocket Loader

在 Security → SSL/TLS 中设置：
- 加密模式: Full (strict)
- ✅ Always Use HTTPS
- ✅ HSTS