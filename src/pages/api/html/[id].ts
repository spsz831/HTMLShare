// src/pages/api/html/[id].ts - API endpoint for raw HTML content
import type { APIRoute } from 'astro';
import { DatabaseService, getDatabase } from '../../../lib/database';

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    const { id } = params;

    if (!id) {
      return new Response('Invalid ID', { status: 400 });
    }

    // Get database from Cloudflare environment
    const db = getDatabase(locals);

    if (!db) {
      return new Response('Database not available', { status: 500 });
    }

    // Fetch page content
    const dbService = new DatabaseService(db);
    const pageData = await dbService.getPageByUrlId(id as string);

    if (!pageData) {
      return new Response('Page not found', { status: 404 });
    }

    // Process HTML content to ensure better rendering
    let processedContent = pageData.content;

    // Ensure the HTML has proper DOCTYPE if missing
    if (!processedContent.trim().toLowerCase().startsWith('<!doctype')) {
      processedContent = '<!DOCTYPE html>\n' + processedContent;
    }

    // Add meta tags for better rendering if HTML doesn't have proper head section
    if (!processedContent.toLowerCase().includes('<meta charset') && !processedContent.toLowerCase().includes('<meta http-equiv="content-type"')) {
      // Find head tag or create one
      const headTagMatch = processedContent.match(/<head[^>]*>/i);
      if (headTagMatch) {
        // Insert after opening head tag
        const headEndIndex = processedContent.indexOf('>', headTagMatch.index) + 1;
        processedContent = processedContent.slice(0, headEndIndex) +
          '\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
          processedContent.slice(headEndIndex);
      } else if (processedContent.toLowerCase().includes('<html')) {
        // Insert after html tag
        const htmlTagMatch = processedContent.match(/<html[^>]*>/i);
        if (htmlTagMatch) {
          const htmlEndIndex = processedContent.indexOf('>', htmlTagMatch.index) + 1;
          processedContent = processedContent.slice(0, htmlEndIndex) +
            '\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n' +
            processedContent.slice(htmlEndIndex);
        }
      }
    }

    // Set appropriate headers for HTML content
    const headers = new Headers();
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    // Enhanced CSP to support external resources while maintaining security
    headers.set('Content-Security-Policy',
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *; " +
      "style-src 'self' 'unsafe-inline' *; " +
      "img-src 'self' data: blob: *; " +
      "font-src 'self' data: *; " +
      "connect-src 'self' *; " +
      "frame-src 'self' *; " +
      "object-src 'none'; " +
      "base-uri 'self';"
    );

    // Allow cross-origin requests for external resources
    headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    headers.set('Cross-Origin-Opener-Policy', 'unsafe-none');

    // Return the processed HTML content directly
    return new Response(processedContent, {
      status: 200,
      headers: headers
    });

  } catch (error) {
    console.error('Error serving HTML:', error);
    return new Response('Internal server error', { status: 500 });
  }
};