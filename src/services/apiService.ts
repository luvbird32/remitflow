
import { ConversionResult } from '@/components/remittance/types'

/**
 * API Service for handling backend communication
 * All business logic has been moved to backend services:
 * - CurrencyService, CountryService, DeliveryService, FeeService, TransferService
 */
export class ApiService {
  private static baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  /**
   * Generic request handler with error handling
   */
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

  /**
   * Get available currencies from CurrencyService
   */
  static async getCurrencies() {
    return this.request('/currencies')
  }

  /**
   * Get available countries from CountryService
   */
  static async getCountries() {
    return this.request('/countries')
  }

  /**
   * Convert currency using CurrencyService
   */
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return this.request<ConversionResult>('/convert', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * Create a new transfer using TransferService
   */
  static async createTransfer(transferData: any) {
    return this.request('/transfers', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  /**
   * Validate transfer data using ValidationService
   */
  static async validateTransfer(transferData: any) {
    return this.request('/transfers/validate', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  /**
   * Get transfer preview using FeeService and other services
   */
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return this.request('/transfers/preview', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * Track a transfer using TransferService
   */
  static async trackTransfer(transferId: string) {
    return this.request(`/transfers/${transferId}`)
  }

  /**
   * Get transfer history from TransferService
   */
  static async getTransferHistory() {
    return this.request('/transfers/history')
  }

  /**
   * Get delivery methods for a country using DeliveryService
   */
  static async getDeliveryMethods(countryCode: string) {
    return this.request(`/countries/${countryCode}/delivery-methods`)
  }
}
