
import { httpClient } from './httpClient'
import { ConversionResult } from '@/components/remittance/types'

/**
 * Enhanced API Service using the HTTP client with interceptors and error handling
 * 
 * This service provides a comprehensive interface for all backend API operations
 * related to the remittance application. It leverages the enhanced HTTP client
 * which includes features like automatic retries, caching, and request/response logging.
 * 
 * The service is organized into logical groups:
 * - Currency operations
 * - Country operations  
 * - Exchange operations
 * - Transfer operations
 * - External service integrations
 */
export class EnhancedApiService {
  
  // ========================================
  // Currency endpoints
  // ========================================
  
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

  // ========================================
  // Country endpoints
  // ========================================

  /**
   * Retrieves all available countries for transfers
   * @returns Promise resolving to array of country objects
   */
  static async getCountries() {
    return httpClient.get('/countries')
  }

  /**
   * Retrieves a specific country by its code
   * @param code - The country code (e.g., 'US', 'GB')
   * @returns Promise resolving to country object
   */
  static async getCountry(code: string) {
    return httpClient.get(`/countries/${code}`)
  }

  /**
   * Gets available delivery methods for a specific country
   * @param countryCode - The country code to get delivery methods for
   * @returns Promise resolving to array of delivery method objects
   */
  static async getDeliveryMethods(countryCode: string) {
    return httpClient.get(`/countries/${countryCode}/delivery-methods`)
  }

  // ========================================
  // Exchange endpoints
  // ========================================

  /**
   * Converts an amount from one currency to another
   * @param data - Conversion request data containing amount, from, and to currencies
   * @param data.amount - The amount to convert
   * @param data.from - Source currency code
   * @param data.to - Target currency code
   * @returns Promise resolving to conversion result with converted amount and rate
   */
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return httpClient.post<ConversionResult>('/exchange/convert', data)
  }

  // ========================================
  // Transfer endpoints
  // ========================================

  /**
   * Creates a new money transfer
   * @param transferData - Complete transfer data including recipient, amount, and payment details
   * @returns Promise resolving to transfer creation response with ID and status
   */
  static async createTransfer(transferData: any) {
    return httpClient.post('/transfers', transferData)
  }

  /**
   * Validates transfer data before submission
   * @param transferData - Transfer data to validate
   * @returns Promise resolving to validation result
   */
  static async validateTransfer(transferData: any) {
    return httpClient.post('/transfers/validate', transferData)
  }

  /**
   * Gets a preview of transfer details including fees and estimated delivery
   * @param data - Transfer preview request data
   * @param data.amount - Transfer amount
   * @param data.fromCurrency - Source currency code
   * @param data.toCurrency - Target currency code
   * @param data.deliveryMethod - Chosen delivery method
   * @returns Promise resolving to transfer preview with fees and timing
   */
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return httpClient.post('/transfers/preview', data)
  }

  /**
   * Tracks the status of an existing transfer
   * @param transferId - The unique transfer identifier
   * @returns Promise resolving to transfer tracking information
   */
  static async trackTransfer(transferId: string) {
    return httpClient.get(`/transfers/${transferId}`)
  }

  /**
   * Retrieves the complete transfer history for the current user
   * @returns Promise resolving to array of historical transfers
   */
  static async getTransferHistory() {
    return httpClient.get('/transfers')
  }

  // ========================================
  // External service endpoints
  // ========================================

  /**
   * Fetches exchange rates from external rate providers
   * @returns Promise resolving to external rate data
   */
  static async getExternalRates() {
    return httpClient.get('/external/rates')
  }

  /**
   * Sends notifications to external services
   * @param data - Notification data including service and payload
   * @returns Promise resolving to notification response
   */
  static async notifyExternalService(data: any) {
    return httpClient.post('/external/notify', data)
  }

  /**
   * Proxies webhook calls to external services
   * @param url - Target webhook URL
   * @param data - Webhook payload data
   * @returns Promise resolving to webhook delivery response
   */
  static async webhookCall(url: string, data: any) {
    return httpClient.post('/external/webhook', { url, data })
  }
}
