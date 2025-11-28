globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDatabase, D as DatabaseService } from '../../../chunks/database_CeGPwUoA.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: "Page ID is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
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
    const dbService = new DatabaseService(db);
    const page = await dbService.getPageByUrlId(id);
    if (!page) {
      return new Response(JSON.stringify({
        success: false,
        error: "Page not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      data: {
        url_id: page.url_id,
        title: page.title,
        description: page.description,
        language: page.language,
        view_count: page.view_count,
        created_at: page.created_at,
        is_public: page.is_public
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
        // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error("Error fetching page:", error);
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
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
