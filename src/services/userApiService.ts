
import { httpClient } from './httpClient'

/**
 * User API Service
 * 
 * Handles all user profile related operations including
 * profile management, preferences, and payment methods.
 */
export class UserApiService {
  /**
   * Retrieves user profile information
   * @param userId - The user identifier
   * @returns Promise resolving to user profile data
   */
  static async getUserProfile(userId: string) {
    return httpClient.get(`/users/profile/${userId}`)
  }

  /**
   * Updates user profile information
   * @param userId - The user identifier
   * @param profileData - Updated profile data
   * @returns Promise resolving to updated profile
   */
  static async updateUserProfile(userId: string, profileData: any) {
    return httpClient.put(`/users/profile/${userId}`, profileData)
  }

  /**
   * Updates user preferences
   * @param userId - The user identifier
   * @param preferences - Updated preference settings
   * @returns Promise resolving to updated preferences
   */
  static async updateUserPreferences(userId: string, preferences: any) {
    return httpClient.put(`/users/profile/${userId}/preferences`, preferences)
  }

  /**
   * Removes a payment method from user's profile
   * @param userId - The user identifier
   * @param paymentMethodId - The payment method to remove
   * @returns Promise resolving to removal confirmation
   */
  static async removePaymentMethod(userId: string, paymentMethodId: string) {
    return httpClient.delete(`/users/profile/${userId}/payment-methods/${paymentMethodId}`)
  }
}
