
/**
 * Type definitions for HTTP client functionality
 */

/**
 * Configuration interface for HTTP client initialization
 */
export interface HttpClientConfig {
  /** Base URL for all API requests */
  baseURL: string;
  /** Request timeout in milliseconds */
  timeout: number;
  /** Default headers to include with requests */
  headers?: Record<string, string>;
}

/**
 * Interface for cached response data
 */
export interface CachedResponse {
  /** The cached response data */
  data: any;
  /** Timestamp when the response was cached */
  timestamp: number;
  /** TTL (time to live) for the cached response in milliseconds */
  ttl: number;
}
