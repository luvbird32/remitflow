
import { httpClient } from './httpClient'
import { ConversionResult } from '@/components/remittance/types'

/**
 * Exchange API Service
 * 
 * Handles all exchange and conversion operations.
 */
export class ExchangeApiService {
  /**
   * Converts an amount from one currency to another
   * @param data - Conversion request data containing amount, from, and to currencies
   * @param data.amount - The amount to convert
   * @param data.from - Source currency code
   * @param data.to - Target currency code
   * @returns Promise resolving to conversion result with converted amount and rate
   */
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return httpClient.post<ConversionResult>('/exchange/convert', data)
  }
}
