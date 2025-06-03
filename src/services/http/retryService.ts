
import { AxiosResponse } from 'axios';

/**
 * Retry service for handling failed HTTP requests
 * 
 * Implements exponential backoff retry logic with configurable
 * maximum attempts and delays.
 */
export class RetryService {
  /**
   * Implements retry logic for failed requests
   * @param requestFn - Function that performs the HTTP request
   * @param maxRetries - Maximum number of retry attempts (default: 3)
   * @param delay - Delay between retries in milliseconds (default: 1000ms)
   * @returns Promise resolving to the response
   */
  static async executeWithRetry<T>(
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
}
