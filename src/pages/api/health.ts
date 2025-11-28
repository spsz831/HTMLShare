// src/pages/api/health.ts - Health check endpoint for monitoring
import type { APIRoute } from 'astro';
import { getDatabase } from '../../lib/database';
import { getCacheService } from '../../lib/cache';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const db = getDatabase(locals);
    const cache = getCacheService(locals);

    // Check database connectivity
    const dbHealthy = db ? true : false;

    // Check cache connectivity
    const cacheHealthy = cache ? true : false;

    // Simple database query test
    let dbQueryHealthy = false;
    if (db) {
      try {
        await db.prepare('SELECT 1').first();
        dbQueryHealthy = true;
      } catch (error) {
        console.error('Database query failed:', error);
      }
    }

    // Check KV cache
    let kvHealthy = false;
    if (cache) {
      try {
        await cache.kv.put('health_check', 'ok', { expirationTtl: 60 });
        const result = await cache.kv.get('health_check');
        kvHealthy = result === 'ok';
      } catch (error) {
        console.error('KV cache failed:', error);
      }
    }

    const healthy = dbHealthy && dbQueryHealthy;
    const status = healthy ? 200 : 503;

    return new Response(JSON.stringify({
      status: healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
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
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Health check error:', error);

    return new Response(JSON.stringify({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }
};