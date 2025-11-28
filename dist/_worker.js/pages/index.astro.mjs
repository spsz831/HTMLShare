globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createComponent, f as createAstro, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate, q as renderComponent, m as maybeRenderHead, v as renderScript } from '../chunks/astro/server_CJTHuxak.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "\u5FEB\u901FHTML\u5206\u4EAB\u5E73\u53F0 - \u57FA\u4E8EAstro + Cloudflare D1" } = Astro2.props;
  return renderTemplate`<html lang="zh-CN" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><title>${title}</title><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} <!-- Footer --> <footer class="mt-20 py-8 text-center text-sm text-gray-400 border-t border-gray-100" data-astro-cid-sckkx6r4> <div class="max-w-4xl mx-auto px-6" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>
HTMLShare v2.0 - 基于
<a href="https://astro.build" target="_blank" rel="noopener" class="hover:text-blue-500 transition-colors" data-astro-cid-sckkx6r4>Astro</a> +
<a href="https://developers.cloudflare.com/d1/" target="_blank" rel="noopener" class="hover:text-blue-500 transition-colors" data-astro-cid-sckkx6r4>Cloudflare D1</a> </p> <p class="mt-2" data-astro-cid-sckkx6r4>快速、安全、直接的HTML分享平台</p> </div> </footer> </body></html>`;
}, "E:/WorkSpace/HTMLShare/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HTMLShare - Simple HTML Sharing" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-white"> <!-- Simplified Header --> <header class="border-b border-gray-100 py-6"> <div class="max-w-3xl mx-auto px-4"> <h1 class="text-3xl font-bold text-gray-900 text-center">
HTMLShare
</h1> <p class="text-gray-500 text-center mt-2 text-sm">
Paste HTML code or upload files to generate shareable links
</p> </div> </header> <!-- Simplified Main Content --> <div class="max-w-3xl mx-auto px-4 py-12"> <!-- Simplified Upload Form --> <div class="bg-gray-50 rounded-lg border border-gray-200 p-6"> <form id="htmlForm"> <!-- HTML Content --> <div class="mb-4"> <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
HTML Content
</label> <textarea id="content" name="content" placeholder="Paste your HTML code here..." rows="16" class="w-full p-4 font-mono text-sm bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea> </div> <!-- Simplified Actions --> <div class="flex gap-3 justify-between"> <div class="flex gap-3"> <label class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm">
📁 Upload File
<input type="file" id="fileInput" accept=".html,.htm" class="hidden"> </label> <button type="button" id="clearBtn" class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
🗑️ Clear
</button> </div> <button type="submit" id="submitBtn" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm disabled:opacity-50">
Generate Link
</button> </div> </form> </div> <!-- Simplified Result Section --> <div id="result" class="mt-6 hidden"> <!-- Result content will be inserted here --> </div> <!-- Simplified Error Section --> <div id="error" class="mt-6 hidden"> <div class="bg-red-50 border border-red-200 rounded-lg p-4"> <p class="text-red-800 font-medium">❌ Creation failed</p> <p id="errorMessage" class="text-red-600 text-sm mt-1"></p> </div> </div> </div> </main>  ${renderScript($$result2, "E:/WorkSpace/HTMLShare/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
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
