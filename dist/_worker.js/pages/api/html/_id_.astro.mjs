globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDatabase, D as DatabaseService } from '../../../chunks/database_D4APuvuG.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response("Invalid ID", { status: 400 });
    }
    const db = getDatabase(locals);
    if (!db) {
      return new Response("Database not available", { status: 500 });
    }
    const dbService = new DatabaseService(db);
    const pageData = await dbService.getPageByUrlId(id);
    if (!pageData) {
      return new Response("Page not found", { status: 404 });
    }
    let processedContent = pageData.content;
    if (!processedContent.trim().toLowerCase().startsWith("<!doctype")) {
      processedContent = "<!DOCTYPE html>\n" + processedContent;
    }
    if (!processedContent.toLowerCase().includes("<meta charset") && !processedContent.toLowerCase().includes('<meta http-equiv="content-type"')) {
      const headTagMatch = processedContent.match(/<head[^>]*>/i);
      if (headTagMatch) {
        const headEndIndex = processedContent.indexOf(">", headTagMatch.index) + 1;
        processedContent = processedContent.slice(0, headEndIndex) + '\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' + processedContent.slice(headEndIndex);
      } else if (processedContent.toLowerCase().includes("<html")) {
        const htmlTagMatch = processedContent.match(/<html[^>]*>/i);
        if (htmlTagMatch) {
          const htmlEndIndex = processedContent.indexOf(">", htmlTagMatch.index) + 1;
          processedContent = processedContent.slice(0, htmlEndIndex) + '\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n' + processedContent.slice(htmlEndIndex);
        }
      }
    }
    const headers = new Headers();
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=3600");
    headers.set(
      "Content-Security-Policy",
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *; img-src 'self' data: blob: *; font-src 'self' data: *; connect-src 'self' *; frame-src 'self' *; object-src 'none'; base-uri 'self';"
    );
    headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");
    headers.set("Cross-Origin-Opener-Policy", "unsafe-none");
    return new Response(processedContent, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error serving HTML:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
