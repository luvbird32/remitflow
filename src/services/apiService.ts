
import { ConversionResult } from '@/components/remittance/types'

/**
 * API Service for handling backend communication
 * All business logic moved to backend services
 */
export class ApiService {
  private static baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  private static async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Generic request method for external use
  static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.makeRequest<T>(endpoint, options)
  }

  // Currency endpoints
  static async getCurrencies() {
    return this.makeRequest('/currencies')
  }

  static async getCurrency(code: string) {
    return this.makeRequest(`/currencies/${code}`)
  }

  static async getExchangeRate(from: string, to: string) {
    return this.makeRequest(`/currencies/rate/${from}/${to}`)
  }

  // Country endpoints
  static async getCountries() {
    return this.makeRequest('/countries')
  }

  static async getCountry(code: string) {
    return this.makeRequest(`/countries/${code}`)
  }

  static async getDeliveryMethods(countryCode: string) {
    return this.makeRequest(`/countries/${countryCode}/delivery-methods`)
  }

  // Exchange endpoints (legacy)
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return this.makeRequest<ConversionResult>('/exchange/convert', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Transfer endpoints
  static async createTransfer(transferData: any) {
    return this.makeRequest('/transfers', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  static async validateTransfer(transferData: any) {
    return this.makeRequest('/transfers/validate', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return this.makeRequest('/transfers/preview', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async trackTransfer(transferId: string) {
    return this.makeRequest(`/transfers/${transferId}`)
  }

  static async getTransferHistory() {
    return this.makeRequest('/transfers')
  }

  // User profile endpoints
  static async getUserProfile(userId: string) {
    return this.makeRequest(`/users/profile/${userId}`)
  }

  static async updateUserProfile(userId: string, profileData: any) {
    return this.makeRequest(`/users/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  // User preferences endpoints
  static async updateUserPreferences(userId: string, preferences: any) {
    return this.makeRequest(`/users/profile/${userId}/preferences`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    })
  }

  // Payment methods endpoints
  static async removePaymentMethod(userId: string, cardId: string) {
    return this.makeRequest(`/users/profile/${userId}/payment-methods/${cardId}`, {
      method: 'DELETE',
    })
  }
}
