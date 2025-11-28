globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_CJTHuxak.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Demo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Demo;
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HTMLShare Demo</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; margin: 0; }
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 500px;
            margin: 20px auto;
        }
        .card h2 { color: #333; margin-top: 0; }
        .card p { color: #666; line-height: 1.6; }
        .success { color: #28a745; font-weight: bold; }
        .feature {
            background: #e3f2fd;
            padding: 15px;
            border-left: 4px solid #2196f3;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>\u{1F389} HTMLShare Astro \u6F14\u793A</h2>
        <p class="success">\u2705 \u76F4\u63A5HTML\u6E32\u67D3\u6210\u529F\uFF01</p>
        <p>\u8FD9\u4E2A\u9875\u9762\u6F14\u793A\u4E86\u65B0\u67B6\u6784\u7684\u6838\u5FC3\u529F\u80FD\uFF1A</p>

        <div class="feature">
            <h3>\u{1F3AF} \u89E3\u51B3\u7684\u95EE\u9898</h3>
            <p><strong>class="card"</strong> \u73B0\u5728\u5B8C\u7F8E\u652F\u6301\uFF01\u65E0\u9700iframe\u5305\u88C5\u3002</p>
        </div>

        <div class="feature">
            <h3>\u26A1 \u6027\u80FD\u63D0\u5347</h3>
            <p>\u76F4\u63A5HTML\u54CD\u5E94\uFF0C\u96F6JavaScript\u8FD0\u884C\u65F6\uFF0C\u8FB9\u7F18\u6E32\u67D3\u3002</p>
        </div>

        <div class="feature">
            <h3>\u{1F3D7}\uFE0F \u67B6\u6784\u7B80\u5316</h3>
            <p>\u4ECE Next.js + Supabase \u5230 Astro + D1\uFF0C\u590D\u6742\u5EA6\u964D\u4F4E70%\u3002</p>
        </div>

        <script>
            // JavaScript \u4E5F\u80FD\u6B63\u5E38\u6267\u884C
            console.log('\u2705 JavaScript execution works!');
            document.addEventListener('DOMContentLoaded', function() {
                const timestamp = new Date().toLocaleString();
                const p = document.createElement('p');
                p.innerHTML = '<strong>\u9875\u9762\u52A0\u8F7D\u65F6\u95F4:</strong> ' + timestamp;
                p.style.cssText = 'background: #f0f8ff; padding: 10px; border-radius: 4px; margin-top: 15px;';
                document.querySelector('.card').appendChild(p);
            });
        <\/script>
    </div>
</body>
</html>`;
  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  return new Response(htmlContent, {
    status: 200,
    headers
  });
}, "E:/WorkSpace/HTMLShare/src/pages/demo.astro", void 0);

const $$file = "E:/WorkSpace/HTMLShare/src/pages/demo.astro";
const $$url = "/demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Demo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
