
/**
 * Base URL for the API endpoints
 */
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * API service class for handling HTTP requests to the backend
 */
export class ApiService {
  /**
   * Makes a POST request to the specified endpoint
   * @param endpoint - API endpoint path
   * @param data - Request payload data
   * @returns Promise resolving to the response JSON
   * @throws Error if the request fails
   */
  static async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }

  /**
   * Makes a GET request to the specified endpoint
   * @param endpoint - API endpoint path
   * @returns Promise resolving to the response JSON
   * @throws Error if the request fails
   */
  static async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }

  // Transfer methods

  /**
   * Creates a new money transfer
   * @param transferData - Transfer information
   * @returns Promise resolving to the created transfer
   */
  static createTransfer(transferData: any) {
    return this.post('/transfers', transferData);
  }

  /**
   * Retrieves a specific transfer by ID
   * @param id - Transfer ID
   * @returns Promise resolving to the transfer data
   */
  static getTransfer(id: string) {
    return this.get(`/transfers/${id}`);
  }

  /**
   * Gets a preview of transfer costs and details
   * @param data - Transfer preview data
   * @returns Promise resolving to the transfer preview
   */
  static getTransferPreview(data: any) {
    return this.post('/transfers/preview', data);
  }

  /**
   * Retrieves all transfers for the current user
   * @returns Promise resolving to array of transfers
   */
  static getAllTransfers() {
    return this.get('/transfers');
  }

  // Exchange methods

  /**
   * Retrieves all available currencies
   * @returns Promise resolving to array of currencies
   */
  static getCurrencies() {
    return this.get('/exchange/currencies');
  }

  /**
   * Retrieves all available countries
   * @returns Promise resolving to array of countries
   */
  static getCountries() {
    return this.get('/exchange/countries');
  }

  /**
   * Gets the exchange rate between two currencies
   * @param from - Source currency code
   * @param to - Target currency code
   * @returns Promise resolving to the exchange rate data
   */
  static getExchangeRate(from: string, to: string) {
    return this.get(`/exchange/rate/${from}/${to}`);
  }

  /**
   * Converts currency amounts using current exchange rates
   * @param data - Currency conversion data
   * @returns Promise resolving to the converted amount
   */
  static convertCurrency(data: any) {
    return this.post('/exchange/convert', data);
  }
}
