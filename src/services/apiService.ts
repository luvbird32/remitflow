
import { httpClient } from './httpClient'
import { TransferFormData } from '@/components/remittance/types'
import { CurrencyApiService } from './currencyApiService'
import { CountryApiService } from './countryApiService'
import { ExchangeApiService } from './exchangeApiService'
import { ExternalApiService } from './externalApiService'
import { UserApiService } from './userApiService'
import { TransferApiService } from './transferApiService'

/**
 * API Service for handling transfer operations
 * This service acts as a bridge between the frontend and backend APIs
 */
export class ApiService {
  /**
   * Creates a new transfer by calling the backend API
   * @param transferData - The complete transfer form data
   * @returns Promise resolving to the transfer creation response
   */
  static async createTransfer(transferData: TransferFormData) {
    try {
      console.log('ApiService: Creating transfer with data:', transferData)
      
      // Transform the frontend form data to match backend expectations
      const backendData = {
        amount: transferData.amount,
        recipientName: transferData.recipientName,
        recipientEmail: transferData.recipientEmail,
        recipientCountry: transferData.recipientCountry,
        deliveryMethod: transferData.deliveryMethod,
        fromCurrency: transferData.fromCurrency,
        toCurrency: transferData.toCurrency,
        accountNumber: transferData.accountNumber,
        bankName: transferData.bankName,
        cardNumber: transferData.cardNumber,
        cardIssuer: transferData.cardIssuer,
        mobileNumber: transferData.mobileNumber,
        mobileProvider: transferData.mobileProvider
      }

      const response = await httpClient.post('/transfers', backendData)
      console.log('ApiService: Transfer created successfully:', response)
      return response
    } catch (error) {
      console.error('ApiService: Transfer creation failed:', error)
      throw error
    }
  }

  /**
   * Validates transfer data before submission
   * @param transferData - The transfer data to validate
   * @returns Promise resolving to validation result
   */
  static async validateTransfer(transferData: TransferFormData) {
    try {
      const response = await httpClient.post('/transfers/validate', transferData)
      return response
    } catch (error) {
      console.error('ApiService: Transfer validation failed:', error)
      throw error
    }
  }

  // Currency API methods
  static async getCurrencies() {
    return CurrencyApiService.getCurrencies()
  }

  static async getCurrency(code: string) {
    return CurrencyApiService.getCurrency(code)
  }

  static async getExchangeRate(from: string, to: string) {
    return CurrencyApiService.getExchangeRate(from, to)
  }

  // Country API methods
  static async getCountries() {
    return CountryApiService.getCountries()
  }

  static async getCountry(code: string) {
    return CountryApiService.getCountry(code)
  }

  static async getDeliveryMethods(countryCode: string) {
    return CountryApiService.getDeliveryMethods(countryCode)
  }

  // Exchange API methods
  static async convertCurrency(data: { amount: string; from: string; to: string }) {
    return ExchangeApiService.convertCurrency(data)
  }

  // External API methods
  static async getExternalRates() {
    return ExternalApiService.getExternalRates()
  }

  static async notifyExternalService(data: any) {
    return ExternalApiService.notifyExternalService(data)
  }

  static async webhookCall(url: string, data: any) {
    return ExternalApiService.webhookCall(url, data)
  }

  // User API methods
  static async getUserProfile(userId: string) {
    return UserApiService.getUserProfile(userId)
  }

  static async updateUserProfile(userId: string, profileData: any) {
    return UserApiService.updateUserProfile(userId, profileData)
  }

  static async updateUserPreferences(userId: string, preferences: any) {
    return UserApiService.updateUserPreferences(userId, preferences)
  }

  static async removePaymentMethod(userId: string, paymentMethodId: string) {
    return UserApiService.removePaymentMethod(userId, paymentMethodId)
  }

  // Transfer API methods
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return TransferApiService.getTransferPreview(data)
  }

  static async trackTransfer(transferId: string) {
    return TransferApiService.trackTransfer(transferId)
  }

  static async getTransferHistory() {
    return TransferApiService.getTransferHistory()
  }
}
