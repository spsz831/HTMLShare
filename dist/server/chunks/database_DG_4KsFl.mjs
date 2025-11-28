import CryptoJS from 'crypto-js';

function generateUrlId(content) {
  const timestamp = Date.now().toString();
  const hash = CryptoJS.MD5(content + timestamp).toString();
  return hash.substring(0, 12);
}
class DatabaseService {
  constructor(db) {
    this.db = db;
  }
  // Create a new page
  async createPage(data) {
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
      throw new Error("Failed to create page");
    }
    return this.getPageByUrlId(urlId);
  }
  // Get page by URL ID (without incrementing view count)
  async getPageByUrlId(urlId) {
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();
    if (!result) return null;
    return result;
  }
  // Get page by URL ID and increment view count
  async getPageByUrlIdAndIncrement(urlId) {
    const result = await this.db.prepare(`
      SELECT * FROM pages WHERE url_id = ?
    `).bind(urlId).first();
    if (!result) return null;
    await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();
    return result;
  }
  // Increment view count for a page
  async incrementViewCount(urlId) {
    const result = await this.db.prepare(`
      UPDATE pages SET view_count = view_count + 1 WHERE url_id = ?
    `).bind(urlId).run();
    return result.success;
  }
  // Get recent public pages
  async getRecentPages(limit = 10) {
    const result = await this.db.prepare(`
      SELECT url_id, title, language, description, view_count, created_at
      FROM pages
      WHERE is_public = 1
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();
    return result.results;
  }
  // Delete page (for admin use)
  async deletePage(urlId) {
    const result = await this.db.prepare(`
      DELETE FROM pages WHERE url_id = ?
    `).bind(urlId).run();
    return result.success;
  }
}

export { DatabaseService as D, generateUrlId as g };
