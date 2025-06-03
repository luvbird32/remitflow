
import { ConversionResult } from '@/components/remittance/types'

/**
 * API Service for handling backend communication
 * All business logic moved to backend services
 */
export class ApiService {
  private static baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
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

  // Currency endpoints
  static async getCurrencies() {
    return this.request('/currencies')
  }

  static async getCurrency(code: string) {
    return this.request(`/currencies/${code}`)
  }

  static async getExchangeRate(from: string, to: string) {
    return this.request(`/currencies/rate/${from}/${to}`)
  }

  // Country endpoints
  static async getCountries() {
    return this.request('/countries')
  }

  static async getCountry(code: string) {
    return this.request(`/countries/${code}`)
  }

  static async getDeliveryMethods(countryCode: string) {
    return this.request(`/countries/${countryCode}/delivery-methods`)
  }

  // Exchange endpoints (legacy)
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return this.request<ConversionResult>('/exchange/convert', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Transfer endpoints
  static async createTransfer(transferData: any) {
    return this.request('/transfers', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  static async validateTransfer(transferData: any) {
    return this.request('/transfers/validate', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return this.request('/transfers/preview', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static async trackTransfer(transferId: string) {
    return this.request(`/transfers/${transferId}`)
  }

  static async getTransferHistory() {
    return this.request('/transfers')
  }
}
