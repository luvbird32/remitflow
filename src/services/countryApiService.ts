
import { httpClient } from './httpClient'

/**
 * Country API Service
 * 
 * Handles all country-related API operations including
 * retrieving countries and delivery methods.
 */
export class CountryApiService {
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
}
