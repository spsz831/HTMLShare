globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDatabase, a as generateUrlId, D as DatabaseService } from '../../chunks/database_CeGPwUoA.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, locals }) => {
  try {
    const db = getDatabase(locals);
    if (!db) {
      return new Response(JSON.stringify({
        success: false,
        error: "Database not available"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = await request.json();
    if (!data.content || !data.content.trim()) {
      return new Response(JSON.stringify({
        success: false,
        error: "HTML content is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    let sanitizedContent = data.content.trim();
    sanitizedContent = sanitizedContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+="[^"]*"/gi, "").replace(/on\w+='[^']*'/gi, "");
    if (!sanitizedContent.includes("<") && !sanitizedContent.includes(">")) {
      return new Response(JSON.stringify({
        success: false,
        error: "Content does not appear to be valid HTML"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const urlId = generateUrlId(sanitizedContent);
    const pageData = {
      url_id: urlId,
      title: data.title?.trim() || "Shared HTML",
      content: sanitizedContent,
      language: "html",
      description: data.description?.trim() || null,
      is_public: data.is_public !== false
      // Default to true
    };
    const dbService = new DatabaseService(db);
    const savedPage = await dbService.createPage(pageData);
    return new Response(JSON.stringify({
      success: true,
      data: {
        url_id: savedPage.url_id,
        title: savedPage.title,
        description: savedPage.description,
        created_at: savedPage.created_at
      }
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating page:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async ({ url, locals }) => {
  try {
    const db = getDatabase(locals);
    if (!db) {
      return new Response(JSON.stringify({
        success: false,
        error: "Database not available"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const searchParams = url.searchParams;
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const dbService = new DatabaseService(db);
    const pages = await dbService.getRecentPages(limit);
    return new Response(JSON.stringify({
      success: true,
      data: pages
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
