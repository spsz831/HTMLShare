# 社交媒体优化设置指南

## ✅ 已完成的优化

### 1. Open Graph 和 Twitter Cards 元标签
- ✅ 主页面 (`src/layouts/Layout.astro`) 已添加完整的社交媒体元标签
- ✅ 分享页面 (`src/pages/view/[id].astro`) 已添加动态元标签
- ✅ 支持动态标题、描述和图片

### 2. 元标签配置详情

#### 主页面标签
```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://htmlshare.top/" />
<meta property="og:title" content="HTMLShare - 极简代码分享" />
<meta property="og:description" content="无需登录，即刻分享你的 HTML/CSS/JS 代码创意" />
<meta property="og:image" content="https://htmlshare.top/og-image.png" />
<meta property="og:site_name" content="HTMLShare" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="HTMLShare - 极简代码分享" />
<meta name="twitter:description" content="无需登录，即刻分享你的 HTML/CSS/JS 代码创意" />
<meta name="twitter:image" content="https://htmlshare.top/og-image.png" />
```

#### 分享页面动态标签
- 自动提取 HTML 内容中的 `<title>` 作为分享标题
- 动态生成分享 URL: `https://htmlshare.top/view/{id}`
- 自动生成描述: "查看在 HTMLShare 上分享的 HTML 代码: {标题}"

## 🎨 社交媒体预览图

### 当前状态
- ✅ 创建了 SVG 版本预览图 (`public/og-image.svg`)
- ✅ 创建了 HTML 模板用于生成 PNG (`public/og-image-fallback.html`)
- ⚠️ **需要手动生成 PNG 图片**

### 生成 PNG 图片步骤

#### 方法 1: 手动截图
1. 在浏览器中打开 `https://htmlshare.top/og-image-fallback.html`
2. 调整浏览器窗口大小为 1200x630 像素
3. 截图并保存为 `public/og-image.png`

#### 方法 2: 使用在线工具
1. 访问 [htmlcsstoimage.com](https://htmlcsstoimage.com/) 或类似服务
2. 上传 `public/og-image-fallback.html` 内容
3. 设置尺寸为 1200x630
4. 下载生成的 PNG 并保存为 `public/og-image.png`

#### 方法 3: 使用 Puppeteer (推荐)
```bash
npm install puppeteer --save-dev
```

创建脚本 `scripts/generate-png.js`:
```javascript
import puppeteer from 'puppeteer';
import path from 'path';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto(`file://${path.resolve('public/og-image-fallback.html')}`);
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
```

## 🧪 测试社交媒体预览

### 测试工具
1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Open Graph 测试**: https://www.opengraph.xyz/

### 测试步骤
1. 部署更新到 https://htmlshare.top
2. 在上述工具中输入以下 URL 进行测试:
   - 主页: `https://htmlshare.top/`
   - 分享页面: `https://htmlshare.top/view/{任意有效ID}`

### 预期结果
- ✅ 显示 HTMLShare 品牌标题
- ✅ 显示正确的描述文本
- ✅ 显示 1200x630 的预览图片
- ✅ 分享页面显示动态标题和描述

## 📱 支持的平台

优化后的元标签支持以下平台的卡片预览:
- 📘 Facebook
- 🐦 Twitter
- 💼 LinkedIn
- 💬 微信
- 🎮 Discord
- 📱 Telegram
- 🔗 Slack

## 🚀 部署后验证

部署完成后，请验证:
1. `https://htmlshare.top/og-image.png` 可以正常访问
2. 在社交媒体平台分享链接时显示正确的卡片
3. 分享的 HTML 页面也有独立的预览卡片

## 📝 注意事项

- 图片必须是 PNG 格式，尺寸 1200x630 像素
- 图片大小建议小于 1MB
- 确保图片在 HTTPS 下可访问
- 某些平台可能需要 24-48 小时才能更新缓存