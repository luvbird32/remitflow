
import { httpClient } from './httpClient'

/**
 * Currency API Service
 * 
 * Handles all currency-related API operations including
 * retrieving currencies, exchange rates, and currency data.
 */
export class CurrencyApiService {
  /**
   * Retrieves all available currencies
   * @returns Promise resolving to array of currency objects
   */
  static async getCurrencies() {
    return httpClient.get('/currencies')
  }

  /**
   * Retrieves a specific currency by its code
   * @param code - The currency code (e.g., 'USD', 'EUR')
   * @returns Promise resolving to currency object
   */
  static async getCurrency(code: string) {
    return httpClient.get(`/currencies/${code}`)
  }

  /**
   * Gets the exchange rate between two currencies
   * @param from - Source currency code
   * @param to - Target currency code
   * @returns Promise resolving to exchange rate data
   */
  static async getExchangeRate(from: string, to: string) {
    return httpClient.get(`/currencies/rate/${from}/${to}`)
  }
}
