
import { ConversionResult } from '@/components/remittance/types'

/**
 * API Service for handling backend communication
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
   * Get available currencies
   */
  static async getCurrencies() {
    return this.request('/currencies')
  }

  /**
   * Get available countries
   */
  static async getCountries() {
    return this.request('/countries')
  }

  /**
   * Convert currency
   */
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return this.request<ConversionResult>('/convert', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * Create a new transfer
   */
  static async createTransfer(transferData: any) {
    return this.request('/transfers', {
      method: 'POST',
      body: JSON.stringify(transferData),
    })
  }

  /**
   * Track a transfer
   */
  static async trackTransfer(transferId: string) {
    return this.request(`/transfers/${transferId}`)
  }

  /**
   * Get transfer history
   */
  static async getTransferHistory() {
    return this.request('/transfers/history')
  }
}
