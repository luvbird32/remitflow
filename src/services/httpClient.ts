
import { HttpClient } from './http/HttpClient';

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
