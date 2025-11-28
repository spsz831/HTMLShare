// src/lib/database.ts - Database service for Cloudflare D1
import type { D1Database } from '@cloudflare/workers-types';
import CryptoJS from 'crypto-js';

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

// Database operations for Cloudflare D1
export class DatabaseService {
  constructor(private db: D1Database) {}

  // Create a new page
  async createPage(data: Omit<PageData, 'id' | 'created_at' | 'updated_at' | 'view_count'>): Promise<PageData> {
    const urlId = data.url_id || generateUrlId(data.content);

    const result = await this.db.prepare(`
      INSERT INTO pages (url_id, title, content, language, description, is_public)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      urlId,
      data.title,
      data.content,
      data.language,
      data.description || null,
      data.is_public ? 1 : 0
    ).run();

    if (!result.success) {
      throw new Error('Failed to create page');
    }

    return this.getPageByUrlId(urlId);
  }

  // Get page by URL ID (without incrementing view count)
  async getPageByUrlId(urlId: string): Promise<PageData | null> {
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();

    if (!result) return null;

    return result as PageData;
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

  // Get recent public pages
  async getRecentPages(limit: number = 10): Promise<PageData[]> {
    const result = await this.db.prepare(`
      SELECT url_id, title, language, description, view_count, created_at
      FROM pages
      WHERE is_public = 1
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();

    return result.results as PageData[];
  }

  // Delete page (for admin use)
  async deletePage(urlId: string): Promise<boolean> {
    const result = await this.db.prepare(`
      DELETE FROM pages WHERE url_id = ?
    `).bind(urlId).run();

    return result.success;
  }
}