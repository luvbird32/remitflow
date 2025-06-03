
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * Configuration interface for HTTP client initialization
 */
interface HttpClientConfig {
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
interface CachedResponse {
  /** The cached response data */
  data: any;
  /** Timestamp when the response was cached */
  timestamp: number;
  /** TTL (time to live) for the cached response in milliseconds */
  ttl: number;
}

/**
 * HTTP Client class with advanced features including interceptors, caching, and retry logic
 * 
 * This class provides a robust HTTP client built on top of Axios with the following features:
 * - Request/response interceptors for authentication and logging
 * - In-memory caching with TTL support
 * - Automatic retry logic for failed requests
 * - Comprehensive error handling
 * - Request/response transformation
 */
class HttpClient {
  private client: AxiosInstance;
  private cache: Map<string, CachedResponse> = new Map();
  
  /**
   * Creates a new HttpClient instance
   * @param config - Configuration options for the HTTP client
   */
  constructor(config: HttpClientConfig) {
    this.client = axios.create(config);
    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors for the HTTP client
   * 
   * Request interceptors:
   * - Add authentication headers
   * - Log outgoing requests
   * - Add request timestamps
   * 
   * Response interceptors:
   * - Log response times
   * - Handle common error scenarios
   * - Cache successful responses
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Ensure headers object exists
        if (!config.headers) {
          config.headers = {} as any;
        }

        // Add auth header if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Log request
        console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          data: config.data
        });

        return config;
      },
      (error) => {
        console.error('[HTTP] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful response
        console.log(`[HTTP] ${response.status} ${response.config.url}`, {
          data: response.data,
          headers: response.headers
        });

        // Cache GET requests
        if (response.config.method === 'get') {
          this.cacheResponse(response.config.url || '', response.data);
        }

        return response;
      },
      (error) => {
        console.error('[HTTP] Response error:', error);
        
        // Handle specific error cases
        if (error.response?.status === 401) {
          // Handle unauthorized - clear auth token
          localStorage.removeItem('auth_token');
          console.warn('[HTTP] Unauthorized - clearing auth token');
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Caches a response with a default TTL of 5 minutes
   * @param url - The URL to cache the response for
   * @param data - The response data to cache
   * @param ttl - Time to live in milliseconds (default: 300000ms = 5 minutes)
   */
  private cacheResponse(url: string, data: any, ttl: number = 300000): void {
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
  private getCachedResponse(url: string): any | null {
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
   * Performs a GET request with caching support
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Check cache first for GET requests
    const cached = this.getCachedResponse(url);
    if (cached) {
      return cached;
    }

    const response = await this.retryRequest(() => this.client.get<T>(url, config));
    return response.data;
  }

  /**
   * Performs a POST request
   * @param url - The endpoint URL
   * @param data - The request body data
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.retryRequest(() => this.client.post<T>(url, data, config));
    return response.data;
  }

  /**
   * Performs a PUT request
   * @param url - The endpoint URL
   * @param data - The request body data
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.retryRequest(() => this.client.put<T>(url, data, config));
    return response.data;
  }

  /**
   * Performs a DELETE request
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.retryRequest(() => this.client.delete<T>(url, config));
    return response.data;
  }

  /**
   * Implements retry logic for failed requests
   * @param requestFn - Function that performs the HTTP request
   * @param maxRetries - Maximum number of retry attempts (default: 3)
   * @param delay - Delay between retries in milliseconds (default: 1000ms)
   * @returns Promise resolving to the response
   */
  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>, 
    maxRetries: number = 3, 
    delay: number = 1000
  ): Promise<AxiosResponse<T>> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on 4xx errors (client errors)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          throw error;
        }

        if (attempt < maxRetries) {
          console.warn(`[HTTP] Request failed, retrying (${attempt}/${maxRetries}) in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }

    throw lastError;
  }

  /**
   * Clears all cached responses
   */
  clearCache(): void {
    this.cache.clear();
    console.log('[HTTP] Cache cleared');
  }

  /**
   * Gets the underlying Axios instance for advanced usage
   * @returns The Axios instance
   */
  getInstance(): AxiosInstance {
    return this.client;
  }
}

/**
 * Pre-configured HTTP client instance for the application
 * 
 * This instance is configured with:
 * - Base URL from environment variables or localhost fallback
 * - 10 second timeout
 * - JSON content type headers
 */
export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
