
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClientConfig } from './types';
import { CacheService } from './cacheService';
import { InterceptorService } from './interceptors';
import { RetryService } from './retryService';
import { ErrorHandler, ErrorType } from './errorHandler';
import { apiCircuitBreaker } from './circuitBreaker';

export class HttpClient {
  private client: AxiosInstance;
  private cacheService: CacheService;
  
  constructor(config: HttpClientConfig) {
    this.client = axios.create(config);
    this.cacheService = new CacheService();
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    InterceptorService.setupInterceptors(this.client, this.cacheService);
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Check cache first for GET requests
    const cached = this.cacheService.get(url);
    if (cached) {
      return cached;
    }

    try {
      const response = await apiCircuitBreaker.execute(() =>
        RetryService.executeWithRetry(() => this.client.get<T>(url, config))
      );
      return response.data;
    } catch (error) {
      const classified = ErrorHandler.handle(error, `GET ${url}`);
      
      // If network error and we have cached data, return it
      if (classified.type === ErrorType.NETWORK) {
        const staleCache = this.cacheService.getStale(url);
        if (staleCache) {
          console.warn('[HttpClient] Using stale cache due to network error');
          return staleCache;
        }
      }
      
      throw error;
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiCircuitBreaker.execute(() =>
        RetryService.executeWithRetry(() => this.client.post<T>(url, data, config))
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error, `POST ${url}`);
      throw error;
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiCircuitBreaker.execute(() =>
        RetryService.executeWithRetry(() => this.client.put<T>(url, data, config))
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error, `PUT ${url}`);
      throw error;
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiCircuitBreaker.execute(() =>
        RetryService.executeWithRetry(() => this.client.delete<T>(url, config))
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error, `DELETE ${url}`);
      throw error;
    }
  }

  clearCache(): void {
    this.cacheService.clear();
  }

  getInstance(): AxiosInstance {
    return this.client;
  }

  getCircuitBreakerStatus() {
    return apiCircuitBreaker.getStats();
  }
}
