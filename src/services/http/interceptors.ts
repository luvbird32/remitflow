
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CacheService } from './cacheService';

/**
 * HTTP interceptors for request and response handling
 * 
 * This module provides interceptor setup for authentication,
 * logging, caching, and error handling.
 */
export class InterceptorService {
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
   * 
   * @param client - Axios instance to setup interceptors for
   * @param cacheService - Cache service instance for response caching
   */
  static setupInterceptors(client: AxiosInstance, cacheService: CacheService): void {
    // Request interceptor
    client.interceptors.request.use(
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
    client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log successful response
        console.log(`[HTTP] ${response.status} ${response.config.url}`, {
          data: response.data,
          headers: response.headers
        });

        // Cache GET requests
        if (response.config.method === 'get') {
          cacheService.set(response.config.url || '', response.data);
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
}
