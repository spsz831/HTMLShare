// scripts/create-placeholder-png.js
// Create a simple placeholder PNG using Canvas API simulation

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG that we can use as a placeholder
const svgContent = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="white">HTMLShare</text>
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)">极简代码分享工具</text>
  <text x="600" y="400" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)">无需登录，即刻分享你的 HTML/CSS/JS 代码创意</text>
  <text x="600" y="500" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">htmlshare.top</text>
</svg>`;

// Save as SVG first
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'og-image-temp.svg');
fs.writeFileSync(svgPath, svgContent);

console.log('✅ Created temporary SVG placeholder at public/og-image-temp.svg');
console.log('📝 You can use this as og-image.png temporarily, or convert it to PNG');
console.log('🔄 To convert SVG to PNG, you can:');
console.log('   1. Open the SVG in browser and screenshot');
console.log('   2. Use online converter like cloudconvert.com');
console.log('   3. Use imagemagick: convert og-image-temp.svg og-image.png');