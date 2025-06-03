import { CachedResponse } from './types';

/**
 * In-memory cache service for HTTP responses
 * 
 * Provides caching functionality with TTL (time to live) support
 * for HTTP responses to reduce redundant API calls and improve
 * application performance.
 */
export class CacheService {
  private cache = new Map<string, CachedResponse>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Stores a response in the cache with TTL
   * @param key - Cache key (typically the request URL)
   * @param data - Response data to cache
   * @param ttl - Time to live in milliseconds (optional)
   */
  set(key: string, data: any, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: expiresAt
    });
  }

  /**
   * Retrieves a cached response if it's still valid
   * @param key - Cache key to look up
   * @returns Cached data or null if not found/expired
   */
  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }

    // Check if cache entry has expired
    if (Date.now() > cached.ttl) {
      // Keep expired data for potential stale usage
      return null;
    }

    return cached.data;
  }

  /**
   * Retrieves cached data even if expired (stale data)
   * Useful for offline scenarios
   * @param key - Cache key to look up
   * @returns Cached data or null if not found
   */
  getStale(key: string): any | null {
    const cached = this.cache.get(key);
    return cached ? cached.data : null;
  }

  /**
   * Removes a specific cache entry
   * @param key - Cache key to remove
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all cached responses
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Gets cache statistics
   * @returns Object with cache metrics
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;

    this.cache.forEach(cached => {
      if (now <= cached.ttl) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    });

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      hitRate: validEntries / Math.max(this.cache.size, 1)
    };
  }

  /**
   * Cleans up expired cache entries
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((cached, key) => {
      // Only delete entries that are older than 1 hour (keep for stale usage)
      if (now - cached.timestamp > 60 * 60 * 1000) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }
}
