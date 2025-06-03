
import { UserApiService } from '../userApiService'
import { ExternalApiService } from '../externalApiService'

/**
 * User Management Service for user operations
 */
export class UserManagementService {
  // User profile methods
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

  // External service methods
  static async getExternalRates() {
    return ExternalApiService.getExternalRates()
  }

  static async notifyExternalService(data: any) {
    return ExternalApiService.notifyExternalService(data)
  }

  static async webhookCall(url: string, data: any) {
    return ExternalApiService.webhookCall(url, data)
  }
}
