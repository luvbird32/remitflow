
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClientConfig } from './types';
import { CacheService } from './cacheService';
import { InterceptorService } from './interceptors';
import { RetryService } from './retryService';

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
export class HttpClient {
  private client: AxiosInstance;
  private cacheService: CacheService;
  
  /**
   * Creates a new HttpClient instance
   * @param config - Configuration options for the HTTP client
   */
  constructor(config: HttpClientConfig) {
    this.client = axios.create(config);
    this.cacheService = new CacheService();
    this.setupInterceptors();
  }

  /**
   * Sets up request and response interceptors for the HTTP client
   */
  private setupInterceptors(): void {
    InterceptorService.setupInterceptors(this.client, this.cacheService);
  }

  /**
   * Performs a GET request with caching support
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Check cache first for GET requests
    const cached = this.cacheService.get(url);
    if (cached) {
      return cached;
    }

    const response = await RetryService.executeWithRetry(() => this.client.get<T>(url, config));
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
    const response = await RetryService.executeWithRetry(() => this.client.post<T>(url, data, config));
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
    const response = await RetryService.executeWithRetry(() => this.client.put<T>(url, data, config));
    return response.data;
  }

  /**
   * Performs a DELETE request
   * @param url - The endpoint URL
   * @param config - Optional Axios request configuration
   * @returns Promise resolving to the response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await RetryService.executeWithRetry(() => this.client.delete<T>(url, config));
    return response.data;
  }

  /**
   * Clears all cached responses
   */
  clearCache(): void {
    this.cacheService.clear();
  }

  /**
   * Gets the underlying Axios instance for advanced usage
   * @returns The Axios instance
   */
  getInstance(): AxiosInstance {
    return this.client;
  }
}
