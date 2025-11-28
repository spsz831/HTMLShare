// src/lib/cache.ts - KV Cache service for performance optimization
import type { KVNamespace } from '@cloudflare/workers-types';
import type { PageData } from './database';

export class CacheService {
  constructor(private kv: KVNamespace) {}

  // Cache keys
  private static readonly KEYS = {
    PAGE: (urlId: string) => `page:${urlId}`,
    RECENT_PAGES: 'recent_pages',
    VIEW_COUNT: (urlId: string) => `views:${urlId}`,
    PAGE_LIST: (limit: number) => `pages_list:${limit}`,
  };

  // Cache TTL (Time To Live) in seconds
  private static readonly TTL = {
    PAGE: 3600,        // 1 hour
    RECENT_PAGES: 300, // 5 minutes
    VIEW_COUNT: 60,    // 1 minute
    PAGE_LIST: 600,    // 10 minutes
  };

  /**
   * Get cached page data
   */
  async getPage(urlId: string): Promise<PageData | null> {
    try {
      const cached = await this.kv.get(CacheService.KEYS.PAGE(urlId), 'json');
      return cached as PageData | null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Cache page data
   */
  async setPage(urlId: string, pageData: PageData): Promise<void> {
    try {
      await this.kv.put(
        CacheService.KEYS.PAGE(urlId),
        JSON.stringify(pageData),
        { expirationTtl: CacheService.TTL.PAGE }
      );
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  /**
   * Get cached recent pages
   */
  async getRecentPages(limit: number): Promise<PageData[] | null> {
    try {
      const cached = await this.kv.get(CacheService.KEYS.PAGE_LIST(limit), 'json');
      return cached as PageData[] | null;
    } catch (error) {
      console.error('Cache get recent pages error:', error);
      return null;
    }
  }

  /**
   * Cache recent pages
   */
  async setRecentPages(limit: number, pages: PageData[]): Promise<void> {
    try {
      await this.kv.put(
        CacheService.KEYS.PAGE_LIST(limit),
        JSON.stringify(pages),
        { expirationTtl: CacheService.TTL.PAGE_LIST }
      );
    } catch (error) {
      console.error('Cache set recent pages error:', error);
    }
  }

  /**
   * Get cached view count
   */
  async getViewCount(urlId: string): Promise<number | null> {
    try {
      const cached = await this.kv.get(CacheService.KEYS.VIEW_COUNT(urlId));
      return cached ? parseInt(cached) : null;
    } catch (error) {
      console.error('Cache get view count error:', error);
      return null;
    }
  }

  /**
   * Update cached view count
   */
  async incrementViewCount(urlId: string): Promise<void> {
    try {
      const current = await this.getViewCount(urlId) || 0;
      await this.kv.put(
        CacheService.KEYS.VIEW_COUNT(urlId),
        (current + 1).toString(),
        { expirationTtl: CacheService.TTL.VIEW_COUNT }
      );
    } catch (error) {
      console.error('Cache increment view count error:', error);
    }
  }

  /**
   * Invalidate page cache
   */
  async invalidatePage(urlId: string): Promise<void> {
    try {
      await Promise.all([
        this.kv.delete(CacheService.KEYS.PAGE(urlId)),
        this.kv.delete(CacheService.KEYS.VIEW_COUNT(urlId)),
      ]);
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }

  /**
   * Invalidate recent pages cache
   */
  async invalidateRecentPages(): Promise<void> {
    try {
      // Clear common limits
      await Promise.all([
        this.kv.delete(CacheService.KEYS.PAGE_LIST(10)),
        this.kv.delete(CacheService.KEYS.PAGE_LIST(20)),
        this.kv.delete(CacheService.KEYS.PAGE_LIST(50)),
      ]);
    } catch (error) {
      console.error('Cache invalidate recent pages error:', error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{ hits: number; misses: number }> {
    try {
      const stats = await this.kv.get('cache_stats', 'json') || { hits: 0, misses: 0 };
      return stats as { hits: number; misses: number };
    } catch (error) {
      console.error('Cache stats error:', error);
      return { hits: 0, misses: 0 };
    }
  }

  /**
   * Update cache statistics
   */
  async updateCacheStats(hit: boolean): Promise<void> {
    try {
      const stats = await this.getCacheStats();
      if (hit) {
        stats.hits++;
      } else {
        stats.misses++;
      }
      await this.kv.put('cache_stats', JSON.stringify(stats), { expirationTtl: 86400 }); // 24 hours
    } catch (error) {
      console.error('Cache update stats error:', error);
    }
  }
}

// Helper function to get cache instance
export function getCacheService(locals?: any): CacheService | null {
  const kv = locals?.runtime?.env?.SESSION;
  return kv ? new CacheService(kv) : null;
}