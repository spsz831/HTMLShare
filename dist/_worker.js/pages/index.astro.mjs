globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createComponent, f as createAstro, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate, q as renderComponent, m as maybeRenderHead, v as renderScript } from '../chunks/astro/server_CJTHuxak.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "\u4E3A\u5F00\u53D1\u8005\u63D0\u4F9B\u7684\u5FEB\u6377HTML\u5206\u4EAB\u5DE5\u5177" } = Astro2.props;
  return renderTemplate`<html lang="zh-CN" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><title>${title}</title><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "E:/WorkSpace/HTMLShare/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HTMLShare - Fast HTML Sharing", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<main class="min-h-screen" style="background-color: var(--bg-primary); color: var(--text-primary);" data-astro-cid-j7pv25f6> <!-- Clean Header with Theme Toggle --> <header class="border-b py-8" style="border-color: var(--border-color);" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto px-6" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between" data-astro-cid-j7pv25f6> <div class="text-center flex-1" data-astro-cid-j7pv25f6> <!-- Clean Logo inspired by html-go --> <h1 class="text-4xl font-bold mb-2" data-astro-cid-j7pv25f6> <span class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent" data-astro-cid-j7pv25f6>HTML</span><span class="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent" data-astro-cid-j7pv25f6>Share</span> </h1> <p class="text-lg" style="color: var(--text-secondary);" data-astro-cid-j7pv25f6>
为开发者提供的快捷HTML分享工具
</p> </div> <!-- Theme Toggle Button --> <button id="themeToggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" style="background-color: var(--bg-card); border: 1px solid var(--border-color);" title="切换主题" data-astro-cid-j7pv25f6> <!-- Sun Icon --> <svg id="sunIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-j7pv25f6></path> </svg> <!-- Moon Icon --> <svg id="moonIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-j7pv25f6></path> </svg> </button> </div> </div> </header> <!-- Clean Main Content --> <div class="max-w-4xl mx-auto px-6 py-12" data-astro-cid-j7pv25f6> <!-- Upload Form --> <div class="rounded-2xl border p-8 shadow-sm" style="background-color: var(--bg-card); border-color: var(--border-color);" data-astro-cid-j7pv25f6> <form id="htmlForm" data-astro-cid-j7pv25f6> <!-- HTML Content Area --> <div class="mb-6" data-astro-cid-j7pv25f6> <label for="content" class="block text-sm font-medium mb-3" style="color: var(--text-primary);" data-astro-cid-j7pv25f6>
请贴入你的 HTML 代码：
</label> <textarea id="content" name="content" placeholder="<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>" rows="18" class="w-full p-4 font-mono text-sm rounded-xl resize-none border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);" required data-astro-cid-j7pv25f6></textarea> </div> <!-- Action Buttons --> <div class="flex gap-3 justify-between items-center" data-astro-cid-j7pv25f6> <div class="flex gap-3" data-astro-cid-j7pv25f6> <!-- Upload File Button --> <label class="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer hover:bg-opacity-80 transition-all duration-200" style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);" data-astro-cid-j7pv25f6>
📁 上传文件
<input type="file" id="fileInput" accept=".html,.htm" class="hidden" data-astro-cid-j7pv25f6> </label> <!-- Clear Button --> <button type="button" id="clearBtn" class="px-4 py-2 rounded-lg border hover:bg-opacity-80 transition-all duration-200" style="background-color: var(--bg-secondary); border-color: var(--border-color); color: var(--text-primary);" data-astro-cid-j7pv25f6>
🗑️ 清空
</button> </div> <!-- Generate Link Button --> <button type="submit" id="submitBtn" class="px-8 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-all duration-200 disabled:opacity-50" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);" data-astro-cid-j7pv25f6>
生成链接
</button> </div> </form> </div> <!-- Result Section --> <div id="result" class="mt-6 hidden" data-astro-cid-j7pv25f6> <!-- Result content will be inserted here --> </div> <!-- Error Section with Theme Support --> <div id="error" class="mt-6 hidden" data-astro-cid-j7pv25f6> <div class="rounded-lg border p-4" style="background-color: #fef2f2; border-color: #fca5a5; color: #dc2626;" data-astro-cid-j7pv25f6> <p class="font-medium" data-astro-cid-j7pv25f6>❌ 创建失败</p> <p id="errorMessage" class="text-sm mt-1" data-astro-cid-j7pv25f6></p> </div> </div> </div> </main>  ${renderScript($$result2, "E:/WorkSpace/HTMLShare/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "E:/WorkSpace/HTMLShare/src/pages/index.astro", void 0);

const $$file = "E:/WorkSpace/HTMLShare/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
