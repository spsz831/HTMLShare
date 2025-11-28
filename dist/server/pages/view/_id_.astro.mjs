/* empty css                                   */
import { c as createComponent, a as createAstro } from '../../chunks/astro/server_BTzg2anj.mjs';
import 'kleur/colors';
import 'clsx';
import { D as DatabaseService } from '../../chunks/database_DG_4KsFl.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/");
  }
  const db = Astro2.locals?.runtime?.env?.DB;
  if (!db) {
    return new Response("Database not available", { status: 500 });
  }
  let pageData = null;
  try {
    const dbService = new DatabaseService(db);
    pageData = await dbService.getPageByUrlId(id);
    if (pageData) {
      await dbService.incrementViewCount(id);
    }
  } catch (error) {
    console.error("Database error:", error);
  }
  if (!pageData) {
    return new Response(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\u9875\u9762\u672A\u627E\u5230 - HTMLShare</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 3rem 2rem;
                border-radius: 1rem;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                max-width: 500px;
                width: 90%;
            }
            h1 { color: #333; margin-bottom: 1rem; }
            p { color: #666; margin-bottom: 2rem; line-height: 1.6; }
            .btn {
                display: inline-block;
                padding: 12px 24px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 500;
                transition: transform 0.2s;
            }
            .btn:hover { transform: translateY(-2px); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>\u{1F50D} \u9875\u9762\u672A\u627E\u5230</h1>
            <p>\u62B1\u6B49\uFF0C\u60A8\u8BBF\u95EE\u7684HTML\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664\u3002</p>
            <a href="/" class="btn">\u8FD4\u56DE\u9996\u9875</a>
        </div>
    </body>
    </html>
  `, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(pageData.content, {
    status: 200,
    headers
  });
}, "E:/WorkSpace/HTMLShare/src/pages/view/[id].astro", void 0);

const $$file = "E:/WorkSpace/HTMLShare/src/pages/view/[id].astro";
const $$url = "/view/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
