
import { CurrencyApiService } from './currencyApiService'
import { CountryApiService } from './countryApiService'
import { ExchangeApiService } from './exchangeApiService'
import { TransferApiService } from './transferApiService'
import { UserApiService } from './userApiService'
import { ExternalApiService } from './externalApiService'

/**
 * Unified API Service
 * 
 * A comprehensive service that provides a single interface to all API operations
 * across the remittance application. This service aggregates functionality from
 * specialized service modules to provide a unified access point for:
 * 
 * - Currency operations (rates, conversion, currency data)
 * - Country operations (country data, delivery methods)
 * - Exchange operations (currency conversion, rate calculations)
 * - Transfer operations (creating, tracking, validating transfers)
 * - User operations (profile management, preferences)
 * - External operations (third-party integrations, webhooks)
 * 
 * @example
 * ```typescript
 * // Get all currencies
 * const currencies = await ApiService.getCurrencies();
 * 
 * // Create a transfer
 * const transfer = await ApiService.createTransfer(transferData);
 * 
 * // Convert currency
 * const result = await ApiService.convertCurrency({
 *   amount: "100",
 *   from: "USD",
 *   to: "EUR"
 * });
 * ```
 */
export class ApiService {
  // Currency operations
  
  /**
   * Retrieves all available currencies for transfers
   * @returns Promise resolving to array of currency objects with codes, names, symbols, and rates
   */
  static async getCurrencies() {
    return CurrencyApiService.getCurrencies()
  }

  /**
   * Retrieves a specific currency by its code
   * @param code - The currency code (e.g., 'USD', 'EUR', 'GBP')
   * @returns Promise resolving to currency object with detailed information
   */
  static async getCurrency(code: string) {
    return CurrencyApiService.getCurrency(code)
  }

  /**
   * Gets the current exchange rate between two currencies
   * @param from - Source currency code
   * @param to - Target currency code
   * @returns Promise resolving to exchange rate data including rate and timestamp
   */
  static async getExchangeRate(from: string, to: string) {
    return CurrencyApiService.getExchangeRate(from, to)
  }

  // Country operations
  
  /**
   * Retrieves all countries available for money transfers
   * @returns Promise resolving to array of country objects with supported delivery methods
   */
  static async getCountries() {
    return CountryApiService.getCountries()
  }

  /**
   * Retrieves detailed information for a specific country
   * @param code - The country code (e.g., 'US', 'GB', 'NG')
   * @returns Promise resolving to country object with currency and delivery options
   */
  static async getCountry(code: string) {
    return CountryApiService.getCountry(code)
  }

  /**
   * Gets available delivery methods for transfers to a specific country
   * @param countryCode - The target country code
   * @returns Promise resolving to array of delivery method objects with fees and timeframes
   */
  static async getDeliveryMethods(countryCode: string) {
    return CountryApiService.getDeliveryMethods(countryCode)
  }

  // Exchange operations
  
  /**
   * Converts an amount from one currency to another using current rates
   * @param data - Conversion request data
   * @param data.amount - The amount to convert as a string
   * @param data.from - Source currency code
   * @param data.to - Target currency code
   * @returns Promise resolving to conversion result with converted amount and rate used
   */
  static async convertCurrency(data: { amount: string; from: string; to: string }) {
    return ExchangeApiService.convertCurrency(data)
  }

  // Transfer operations
  
  /**
   * Creates a new money transfer with recipient and payment details
   * @param transferData - Complete transfer information including recipient, amount, and delivery method
   * @returns Promise resolving to transfer response with ID, status, and estimated delivery
   */
  static async createTransfer(transferData: any) {
    return TransferApiService.createTransfer(transferData)
  }

  /**
   * Validates transfer data before submission to check for errors
   * @param transferData - Transfer data to validate against business rules
   * @returns Promise resolving to validation result with any errors found
   */
  static async validateTransfer(transferData: any) {
    return TransferApiService.validateTransfer(transferData)
  }

  /**
   * Gets a preview of transfer costs and timing before final submission
   * @param data - Transfer preview request data
   * @returns Promise resolving to preview with fees, rates, and estimated delivery time
   */
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return TransferApiService.getTransferPreview(data)
  }

  /**
   * Tracks the current status and location of an existing transfer
   * @param transferId - The unique transfer identifier
   * @returns Promise resolving to tracking information with status history and location
   */
  static async trackTransfer(transferId: string) {
    return TransferApiService.trackTransfer(transferId)
  }

  /**
   * Retrieves the complete transfer history for the current user
   * @returns Promise resolving to array of historical transfers with status and details
   */
  static async getTransferHistory() {
    return TransferApiService.getTransferHistory()
  }

  // User operations
  
  /**
   * Retrieves user profile information including personal details and preferences
   * @param userId - The unique user identifier
   * @returns Promise resolving to user profile data
   */
  static async getUserProfile(userId: string) {
    return UserApiService.getUserProfile(userId)
  }

  /**
   * Updates user profile information with new data
   * @param userId - The unique user identifier
   * @param profileData - Updated profile information
   * @returns Promise resolving to updated profile data
   */
  static async updateUserProfile(userId: string, profileData: any) {
    return UserApiService.updateUserProfile(userId, profileData)
  }

  /**
   * Updates user preferences for notifications, language, and other settings
   * @param userId - The unique user identifier
   * @param preferences - Updated preference settings
   * @returns Promise resolving to updated preferences
   */
  static async updateUserPreferences(userId: string, preferences: any) {
    return UserApiService.updateUserPreferences(userId, preferences)
  }

  /**
   * Removes a payment method from the user's saved payment options
   * @param userId - The unique user identifier
   * @param paymentMethodId - The payment method identifier to remove
   * @returns Promise resolving to removal confirmation
   */
  static async removePaymentMethod(userId: string, paymentMethodId: string) {
    return UserApiService.removePaymentMethod(userId, paymentMethodId)
  }

  // External operations
  
  /**
   * Fetches current exchange rates from external rate providers for accuracy
   * @returns Promise resolving to external rate data from multiple providers
   */
  static async getExternalRates() {
    return ExternalApiService.getExternalRates()
  }

  /**
   * Sends notifications to external services for transfer updates
   * @param data - Notification data including recipient service and message payload
   * @returns Promise resolving to notification delivery confirmation
   */
  static async notifyExternalService(data: any) {
    return ExternalApiService.notifyExternalService(data)
  }

  /**
   * Makes webhook calls to external services for integrations
   * @param url - Target webhook URL for the external service
   * @param data - Webhook payload data to send
   * @returns Promise resolving to webhook delivery response
   */
  static async webhookCall(url: string, data: any) {
    return ExternalApiService.webhookCall(url, data)
  }
}

// Backward compatibility alias (deprecated - use ApiService instead)
export const EnhancedApiService = ApiService
