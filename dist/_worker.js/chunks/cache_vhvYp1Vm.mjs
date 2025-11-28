globalThis.process ??= {}; globalThis.process.env ??= {};
class CacheService {
  constructor(kv) {
    this.kv = kv;
  }
  // Cache keys
  static KEYS = {
    PAGE: (urlId) => `page:${urlId}`,
    RECENT_PAGES: "recent_pages",
    VIEW_COUNT: (urlId) => `views:${urlId}`,
    PAGE_LIST: (limit) => `pages_list:${limit}`
  };
  // Cache TTL (Time To Live) in seconds
  static TTL = {
    PAGE: 3600,
    // 1 hour
    RECENT_PAGES: 300,
    // 5 minutes
    VIEW_COUNT: 60,
    // 1 minute
    PAGE_LIST: 600
    // 10 minutes
  };
  /**
   * Get cached page data
   */
  async getPage(urlId) {
    try {
      const cached = await this.kv.get(CacheService.KEYS.PAGE(urlId), "json");
      return cached;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }
  /**
   * Cache page data
   */
  async setPage(urlId, pageData) {
    try {
      await this.kv.put(
        CacheService.KEYS.PAGE(urlId),
        JSON.stringify(pageData),
        { expirationTtl: CacheService.TTL.PAGE }
      );
    } catch (error) {
      console.error("Cache set error:", error);
    }
  }
  /**
   * Get cached recent pages
   */
  async getRecentPages(limit) {
    try {
      const cached = await this.kv.get(CacheService.KEYS.PAGE_LIST(limit), "json");
      return cached;
    } catch (error) {
      console.error("Cache get recent pages error:", error);
      return null;
    }
  }
  /**
   * Cache recent pages
   */
  async setRecentPages(limit, pages) {
    try {
      await this.kv.put(
        CacheService.KEYS.PAGE_LIST(limit),
        JSON.stringify(pages),
        { expirationTtl: CacheService.TTL.PAGE_LIST }
      );
    } catch (error) {
      console.error("Cache set recent pages error:", error);
    }
  }
  /**
   * Get cached view count
   */
  async getViewCount(urlId) {
    try {
      const cached = await this.kv.get(CacheService.KEYS.VIEW_COUNT(urlId));
      return cached ? parseInt(cached) : null;
    } catch (error) {
      console.error("Cache get view count error:", error);
      return null;
    }
  }
  /**
   * Update cached view count
   */
  async incrementViewCount(urlId) {
    try {
      const current = await this.getViewCount(urlId) || 0;
      await this.kv.put(
        CacheService.KEYS.VIEW_COUNT(urlId),
        (current + 1).toString(),
        { expirationTtl: CacheService.TTL.VIEW_COUNT }
      );
    } catch (error) {
      console.error("Cache increment view count error:", error);
    }
  }
  /**
   * Invalidate page cache
   */
  async invalidatePage(urlId) {
    try {
      await Promise.all([
        this.kv.delete(CacheService.KEYS.PAGE(urlId)),
        this.kv.delete(CacheService.KEYS.VIEW_COUNT(urlId))
      ]);
    } catch (error) {
      console.error("Cache invalidate error:", error);
    }
  }
  /**
   * Invalidate recent pages cache
   */
  async invalidateRecentPages() {
    try {
      await Promise.all([
        this.kv.delete(CacheService.KEYS.PAGE_LIST(10)),
        this.kv.delete(CacheService.KEYS.PAGE_LIST(20)),
        this.kv.delete(CacheService.KEYS.PAGE_LIST(50))
      ]);
    } catch (error) {
      console.error("Cache invalidate recent pages error:", error);
    }
  }
  /**
   * Get cache statistics
   */
  async getCacheStats() {
    try {
      const stats = await this.kv.get("cache_stats", "json") || { hits: 0, misses: 0 };
      return stats;
    } catch (error) {
      console.error("Cache stats error:", error);
      return { hits: 0, misses: 0 };
    }
  }
  /**
   * Update cache statistics
   */
  async updateCacheStats(hit) {
    try {
      const stats = await this.getCacheStats();
      if (hit) {
        stats.hits++;
      } else {
        stats.misses++;
      }
      await this.kv.put("cache_stats", JSON.stringify(stats), { expirationTtl: 86400 });
    } catch (error) {
      console.error("Cache update stats error:", error);
    }
  }
}
function getCacheService(locals) {
  const kv = locals?.runtime?.env?.SESSION;
  return kv ? new CacheService(kv) : null;
}

export { getCacheService as g };
