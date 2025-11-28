globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getDatabase } from '../../chunks/database_D4APuvuG.mjs';
import { g as getCacheService } from '../../chunks/cache_vhvYp1Vm.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ locals }) => {
  try {
    const db = getDatabase(locals);
    const cache = getCacheService(locals);
    const dbHealthy = db ? true : false;
    const cacheHealthy = cache ? true : false;
    let dbQueryHealthy = false;
    if (db) {
      try {
        await db.prepare("SELECT 1").first();
        dbQueryHealthy = true;
      } catch (error) {
        console.error("Database query failed:", error);
      }
    }
    let kvHealthy = false;
    if (cache) {
      try {
        await cache.kv.put("health_check", "ok", { expirationTtl: 60 });
        const result = await cache.kv.get("health_check");
        kvHealthy = result === "ok";
      } catch (error) {
        console.error("KV cache failed:", error);
      }
    }
    const healthy = dbHealthy && dbQueryHealthy;
    const status = healthy ? 200 : 503;
    return new Response(JSON.stringify({
      status: healthy ? "healthy" : "unhealthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "2.0.0",
      services: {
        database: {
          connected: dbHealthy,
          queryable: dbQueryHealthy
        },
        cache: {
          connected: cacheHealthy,
          functional: kvHealthy
        }
      }
    }), {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error) {
    console.error("Health check error:", error);
    return new Response(JSON.stringify({
      status: "error",
      message: "Health check failed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
