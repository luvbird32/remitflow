
import { BaseApiService } from './api/baseApiService'
import { DataApiService } from './api/dataApiService'
import { TransactionApiService } from './api/transactionApiService'
import { UserManagementService } from './api/userManagementService'
import { TransferFormData } from '@/components/remittance/types'

/**
 * Main API Service - delegates to specialized services
 */
export class ApiService {
  // Core transfer operations
  static async createTransfer(transferData: TransferFormData) {
    return BaseApiService.createTransfer(transferData)
  }

  static async validateTransfer(transferData: TransferFormData) {
    return BaseApiService.validateTransfer(transferData)
  }

  // Data operations
  static async getCurrencies() {
    return DataApiService.getCurrencies()
  }

  static async getCurrency(code: string) {
    return DataApiService.getCurrency(code)
  }

  static async getExchangeRate(from: string, to: string) {
    return DataApiService.getExchangeRate(from, to)
  }

  static async getCountries() {
    return DataApiService.getCountries()
  }

  static async getCountry(code: string) {
    return DataApiService.getCountry(code)
  }

  static async getDeliveryMethods(countryCode: string) {
    return DataApiService.getDeliveryMethods(countryCode)
  }

  // Transaction operations
  static async convertCurrency(data: { amount: string; from: string; to: string }) {
    return TransactionApiService.convertCurrency(data)
  }

  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return TransactionApiService.getTransferPreview(data)
  }

  static async trackTransfer(transferId: string) {
    return TransactionApiService.trackTransfer(transferId)
  }

  static async getTransferHistory() {
    return TransactionApiService.getTransferHistory()
  }

  // User management operations
  static async getUserProfile(userId: string) {
    return UserManagementService.getUserProfile(userId)
  }

  static async updateUserProfile(userId: string, profileData: any) {
    return UserManagementService.updateUserProfile(userId, profileData)
  }

  static async updateUserPreferences(userId: string, preferences: any) {
    return UserManagementService.updateUserPreferences(userId, preferences)
  }

  static async removePaymentMethod(userId: string, paymentMethodId: string) {
    return UserManagementService.removePaymentMethod(userId, paymentMethodId)
  }

  static async getExternalRates() {
    return UserManagementService.getExternalRates()
  }

  static async notifyExternalService(data: any) {
    return UserManagementService.notifyExternalService(data)
  }

  static async webhookCall(url: string, data: any) {
    return UserManagementService.webhookCall(url, data)
  }
}
