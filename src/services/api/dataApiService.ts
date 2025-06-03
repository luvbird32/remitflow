
import { CurrencyApiService } from '../currencyApiService'
import { CountryApiService } from '../countryApiService'

/**
 * Data API Service for currencies and countries
 */
export class DataApiService {
  // Currency methods
  static async getCurrencies() {
    return CurrencyApiService.getCurrencies()
  }

  static async getCurrency(code: string) {
    return CurrencyApiService.getCurrency(code)
  }

  static async getExchangeRate(from: string, to: string) {
    return CurrencyApiService.getExchangeRate(from, to)
  }

  // Country methods
  static async getCountries() {
    return CountryApiService.getCountries()
  }

  static async getCountry(code: string) {
    return CountryApiService.getCountry(code)
  }

  static async getDeliveryMethods(countryCode: string) {
    return CountryApiService.getDeliveryMethods(countryCode)
  }
}
