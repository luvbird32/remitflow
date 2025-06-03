
import { CachedResponse } from './types';

/**
 * Cache service for HTTP responses with TTL support
 * 
 * This service provides in-memory caching functionality with automatic
 * expiration based on TTL (time to live) values.
 */
export class CacheService {
  private cache: Map<string, CachedResponse> = new Map();

  /**
   * Caches a response with a default TTL of 5 minutes
   * @param url - The URL to cache the response for
   * @param data - The response data to cache
   * @param ttl - Time to live in milliseconds (default: 300000ms = 5 minutes)
   */
  set(url: string, data: any, ttl: number = 300000): void {
    this.cache.set(url, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Retrieves cached response if it exists and hasn't expired
   * @param url - The URL to check for cached response
   * @returns Cached data if valid, null otherwise
   */
  get(url: string): any | null {
    const cached = this.cache.get(url);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(url);
      return null;
    }

    console.log('[HTTP] Cache hit for:', url);
    return cached.data;
  }

  /**
   * Clears all cached responses
   */
  clear(): void {
    this.cache.clear();
    console.log('[HTTP] Cache cleared');
  }
}
