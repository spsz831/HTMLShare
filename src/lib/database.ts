// src/lib/database.ts - Database service for Cloudflare D1 with cache integration
import type { D1Database } from '@cloudflare/workers-types';
import CryptoJS from 'crypto-js';
import { CompressionService } from './compression';
import { CacheService } from './cache';

// Page data interface
export interface PageData {
  id?: number;
  url_id: string;
  title: string;
  content: string;
  language: string;
  description?: string | null;
  view_count?: number;
  is_public?: boolean;
  is_compressed?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Generate unique URL ID (similar to html-go approach)
export function generateUrlId(content: string): string {
  const timestamp = Date.now().toString();
  const hash = CryptoJS.MD5(content + timestamp).toString();
  return hash.substring(0, 12); // 12 character unique ID
}

// Get database instance - Cloudflare D1 only
export function getDatabase(locals?: any): D1Database | null {
  // Get database from Cloudflare runtime
  return locals?.runtime?.env?.DB || null;
}

// Database operations for Cloudflare D1 with cache integration
export class DatabaseService {
  constructor(
    private db: D1Database,
    private cache?: CacheService | null
  ) {}

  // Create a new page with compression and cache invalidation
  async createPage(data: Omit<PageData, 'id' | 'created_at' | 'updated_at' | 'view_count'>): Promise<PageData> {
    const urlId = data.url_id || generateUrlId(data.content);

    // Apply smart compression
    const compressionResult = CompressionService.smartCompress(data.content);

    const result = await this.db.prepare(`
      INSERT INTO pages (url_id, title, content, language, description, is_public, is_compressed)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      urlId,
      data.title,
      compressionResult.content,
      data.language,
      data.description || null,
      data.is_public ? 1 : 0,
      compressionResult.compressed ? 1 : 0
    ).run();

    if (!result.success) {
      throw new Error('Failed to create page');
    }

    // Invalidate recent pages cache when new page is created
    if (this.cache) {
      await this.cache.invalidateRecentPages();
    }

    return this.getPageByUrlId(urlId);
  }

  // Get page by URL ID with cache support
  async getPageByUrlId(urlId: string): Promise<PageData | null> {
    // Try cache first
    if (this.cache) {
      const cached = await this.cache.getPage(urlId);
      if (cached) {
        await this.cache.updateCacheStats(true); // Cache hit
        return cached;
      }
      await this.cache.updateCacheStats(false); // Cache miss
    }

    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();

    if (!result) return null;

    const page = result as PageData;

    // Decompress content if it was compressed
    if (page.is_compressed) {
      page.content = CompressionService.decompress(page.content);
    }

    // Cache the result
    if (this.cache) {
      await this.cache.setPage(urlId, page);
    }

    return page;
  }

  // Get page by URL ID and increment view count
  async getPageByUrlIdAndIncrement(urlId: string): Promise<PageData | null> {
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();

    if (!result) return null;

    // Increment view count
    await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();

    return result as PageData;
  }

  // Increment view count for a page
  async incrementViewCount(urlId: string): Promise<boolean> {
    const result = await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();

    return result.success;
  }

  // Get recent public pages with cache support
  async getRecentPages(limit: number = 10): Promise<PageData[]> {
    // Try cache first
    if (this.cache) {
      const cached = await this.cache.getRecentPages(limit);
      if (cached) {
        await this.cache.updateCacheStats(true);
        return cached;
      }
      await this.cache.updateCacheStats(false);
    }

    const result = await this.db.prepare(`
      SELECT url_id, title, language, description, view_count, created_at
      FROM pages
      WHERE is_public = 1
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();

    const pages = result.results as PageData[];

    // Cache the result
    if (this.cache) {
      await this.cache.setRecentPages(limit, pages);
    }

    return pages;
  }

  // Delete page (for admin use)
  async deletePage(urlId: string): Promise<boolean> {
    const result = await this.db.prepare(`
      DELETE FROM pages WHERE url_id = ?
    `).bind(urlId).run();

    return result.success;
  }
}