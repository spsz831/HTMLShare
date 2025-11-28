// src/pages/api/pages/[id].ts - API endpoint for getting specific page
import type { APIRoute } from 'astro';
import { DatabaseService } from '../../../lib/database';

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Page ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = locals?.runtime?.env?.DB;

    if (!db) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Database not available'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const dbService = new DatabaseService(db);
    const page = await dbService.getPageByUrlId(id as string);

    if (!page) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Page not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Return page data (without content for API calls)
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
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error fetching page:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};