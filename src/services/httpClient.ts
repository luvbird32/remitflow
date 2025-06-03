
import { HttpClient } from './http/HttpClient';

/**
 * Configured HTTP client instance for the application
 */
const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export { httpClient };
