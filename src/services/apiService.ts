
import { CurrencyApiService } from './currencyApiService'
import { CountryApiService } from './countryApiService'
import { ExchangeApiService } from './exchangeApiService'
import { TransferApiService } from './transferApiService'
import { UserApiService } from './userApiService'
import { ExternalApiService } from './externalApiService'

/**
 * Main API Service
 * 
 * Provides a unified interface to all API services while maintaining
 * the same interface as the original EnhancedApiService for backward compatibility.
 * Each service group is organized into its own focused module.
 */
export class ApiService {
  // Currency operations
  static getCurrencies = CurrencyApiService.getCurrencies
  static getCurrency = CurrencyApiService.getCurrency
  static getExchangeRate = CurrencyApiService.getExchangeRate

  // Country operations
  static getCountries = CountryApiService.getCountries
  static getCountry = CountryApiService.getCountry
  static getDeliveryMethods = CountryApiService.getDeliveryMethods

  // Exchange operations
  static convertCurrency = ExchangeApiService.convertCurrency

  // Transfer operations
  static createTransfer = TransferApiService.createTransfer
  static validateTransfer = TransferApiService.validateTransfer
  static getTransferPreview = TransferApiService.getTransferPreview
  static trackTransfer = TransferApiService.trackTransfer
  static getTransferHistory = TransferApiService.getTransferHistory

  // User profile operations
  static getUserProfile = UserApiService.getUserProfile
  static updateUserProfile = UserApiService.updateUserProfile
  static updateUserPreferences = UserApiService.updateUserPreferences
  static removePaymentMethod = UserApiService.removePaymentMethod

  // External service operations
  static getExternalRates = ExternalApiService.getExternalRates
  static notifyExternalService = ExternalApiService.notifyExternalService
  static webhookCall = ExternalApiService.webhookCall
}

// For backward compatibility, also export as EnhancedApiService
export { ApiService as EnhancedApiService }

// Export individual services for more specific imports
export {
  CurrencyApiService,
  CountryApiService,
  ExchangeApiService,
  TransferApiService,
  UserApiService,
  ExternalApiService
}
