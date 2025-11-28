globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createComponent, f as createAstro, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate, q as renderComponent, m as maybeRenderHead, v as renderScript } from '../chunks/astro/server_CJTHuxak.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "\u5FEB\u901FHTML\u5206\u4EAB\u5E73\u53F0 - \u57FA\u4E8EAstro + Cloudflare D1" } = Astro2.props;
  return renderTemplate`<html lang="zh-CN" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><title>${title}</title><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} <!-- Footer --> <footer class="mt-20 py-8 text-center text-sm text-gray-400 border-t border-gray-100" data-astro-cid-sckkx6r4> <div class="max-w-4xl mx-auto px-6" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>
HTMLShare v2.0 - 基于
<a href="https://astro.build" target="_blank" rel="noopener" class="hover:text-blue-500 transition-colors" data-astro-cid-sckkx6r4>Astro</a> +
<a href="https://developers.cloudflare.com/d1/" target="_blank" rel="noopener" class="hover:text-blue-500 transition-colors" data-astro-cid-sckkx6r4>Cloudflare D1</a> </p> <p class="mt-2" data-astro-cid-sckkx6r4>快速、安全、直接的HTML分享平台</p> </div> </footer> </body></html>`;
}, "E:/WorkSpace/HTMLShare/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HTMLShare - \u5FEB\u901FHTML\u5206\u4EAB" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"> <!-- Header --> <header class="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"> <div class="max-w-4xl mx-auto px-6 py-4"> <div class="flex items-center justify-between"> <div class="flex items-center space-x-4"> <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
HTMLShare
</h1> <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
Astro + D1
</span> </div> <div class="text-sm text-gray-500">
快速HTML分享平台
</div> </div> </div> </header> <!-- Main Content --> <div class="max-w-4xl mx-auto px-6 py-16"> <div class="text-center mb-12"> <h2 class="text-4xl font-bold text-gray-900 mb-4">
粘贴HTML代码或上传文件，生成永久分享链接
</h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
支持完整HTML文档和外部资源加载，一键生成永久访问链接
</p> </div> <!-- Upload Card --> <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"> <form id="htmlForm" class="p-8"> <!-- HTML Content --> <div class="mb-6"> <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
HTML内容
</label> <textarea id="content" name="content" placeholder="请粘贴您的HTML代码..." rows="20" class="w-full p-6 font-mono text-sm bg-gray-50/70 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea> </div> <!-- Actions --> <div class="flex gap-4 justify-between items-center"> <div class="flex gap-4"> <label class="flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 cursor-pointer transition-all duration-200"> <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path> </svg> <span class="text-sm font-medium text-gray-700">上传文件</span> <input type="file" id="fileInput" accept=".html,.htm" class="hidden"> </label> <button type="button" id="clearBtn" class="flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200"> <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg> <span class="text-sm font-medium text-gray-700">清空</span> </button> </div> <button type="submit" id="submitBtn" class="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium disabled:opacity-50"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path> </svg> <span>生成链接</span> </button> </div> </form> </div> <!-- Result Section --> <div id="result" class="mt-8 hidden"> <!-- Result content will be inserted here --> </div> <!-- Error Section --> <div id="error" class="mt-8 hidden"> <div class="bg-red-50 border border-red-200 rounded-2xl p-6"> <div class="flex items-center gap-3"> <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <p class="text-red-800 font-semibold">创建失败</p> </div> <p id="errorMessage" class="text-red-600 mt-2"></p> </div> </div> </div> </main>  ${renderScript($$result2, "E:/WorkSpace/HTMLShare/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
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
