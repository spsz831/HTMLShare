// Updated database service with proper JSDOM integration
import CryptoJS from 'crypto-js';

// Define D1Database interface for TypeScript
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first(): Promise<any>;
  all(): Promise<{ results: any[]; success: boolean; meta: any }>;
  run(): Promise<{ success: boolean; meta: any }>;
}

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

  // Get page by URL ID
  async getPageByUrlId(urlId: string): Promise<PageData | null> {
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