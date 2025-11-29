// scripts/generate-og-image.js
// Script to generate PNG from SVG for social media preview

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For now, we'll create a simple HTML file that can be used to generate the PNG
// You can use tools like Puppeteer or similar to convert this to PNG

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .decorative {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
        }

        .circle1 { width: 120px; height: 120px; top: 40px; left: 40px; }
        .circle2 { width: 160px; height: 160px; bottom: 50px; right: 20px; }

        .code-bracket {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-size: 120px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.2);
        }

        .bracket-left { top: 100px; left: 140px; }
        .bracket-right { bottom: 80px; right: 100px; }

        .main-title {
            font-size: 72px;
            font-weight: bold;
            background: linear-gradient(90deg, #ec4899, #ef4444, #f59e0b, #10b981, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
        }

        .subtitle {
            font-size: 32px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
        }

        .description {
            font-size: 24px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            text-align: center;
        }

        .url {
            font-size: 28px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 30px;
        }

        .features {
            display: flex;
            gap: 20px;
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="decorative circle1"></div>
    <div class="decorative circle2"></div>

    <div class="code-bracket bracket-left">&lt;</div>
    <div class="code-bracket bracket-right">/&gt;</div>

    <div class="main-title">HTMLShare</div>
    <div class="subtitle">极简代码分享工具</div>
    <div class="description">无需登录，即刻分享你的 HTML/CSS/JS 代码创意</div>
    <div class="url">htmlshare.top</div>

    <div class="features">
        <div class="feature-icon">⚡</div>
        <div class="feature-icon">🔗</div>
        <div class="feature-icon">💻</div>
        <div class="feature-icon">🛡️</div>
        <div class="feature-icon">🌐</div>
    </div>
</body>
</html>
`;

// Write the HTML template
fs.writeFileSync(path.join(__dirname, '..', 'public', 'og-image-template.html'), htmlTemplate);

console.log('✅ OG image template created at public/og-image-template.html');
console.log('📝 To generate PNG:');
console.log('   1. Open og-image-template.html in browser');
console.log('   2. Take screenshot (1200x630)');
console.log('   3. Save as og-image.png in public/ folder');
console.log('   Or use Puppeteer/Playwright for automation');