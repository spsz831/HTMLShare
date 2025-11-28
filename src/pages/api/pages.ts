// src/pages/api/pages.ts - API endpoint for creating pages with cache support
import type { APIRoute } from 'astro';
import { DatabaseService, generateUrlId, getDatabase } from '../../lib/database';
import { getCacheService } from '../../lib/cache';
import { SecurityService } from '../../lib/security';
import type { PageData } from '../../lib/database';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get database and cache
    const db = getDatabase(locals);
    const cache = getCacheService(locals);

    if (!db) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Database not available'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.content || !data.content.trim()) {
      return new Response(JSON.stringify({
        success: false,
        error: 'HTML content is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Enhanced sanitization for security
    let sanitizedContent = SecurityService.sanitizeContent(data.content.trim());

    // Basic HTML validation
    if (!sanitizedContent.includes('<') && !sanitizedContent.includes('>')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Content does not appear to be valid HTML'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate unique URL ID
    const urlId = generateUrlId(sanitizedContent);

    // Create page data
    const pageData: Omit<PageData, 'id' | 'created_at' | 'updated_at' | 'view_count'> = {
      url_id: urlId,
      title: data.title?.trim() || 'Shared HTML',
      content: sanitizedContent,
      language: 'html',
      description: data.description?.trim() || null,
      is_public: data.is_public !== false // Default to true
    };

    // Save to database with cache support
    const dbService = new DatabaseService(db, cache);
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
      headers: {
        'Content-Type': 'application/json',
        ...SecurityService.getSecurityHeaders()
      }
    });

  } catch (error) {
    console.error('Error creating page:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ url, locals }) => {
  try {
    const db = getDatabase(locals);
    const cache = getCacheService(locals);

    if (!db) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Database not available'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get query parameters
    const searchParams = url.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50); // Max 50 items

    const dbService = new DatabaseService(db, cache);
    const pages = await dbService.getRecentPages(limit);

    return new Response(JSON.stringify({
      success: true,
      data: pages
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Error fetching pages:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};