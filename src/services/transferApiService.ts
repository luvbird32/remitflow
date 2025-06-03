
import { httpClient } from './httpClient'

/**
 * Transfer API Service
 * 
 * Handles all transfer-related operations including creating,
 * validating, tracking, and managing transfers.
 */
export class TransferApiService {
  /**
   * Creates a new money transfer
   * @param transferData - Complete transfer data including recipient, amount, and payment details
   * @returns Promise resolving to transfer creation response with ID and status
   */
  static async createTransfer(transferData: any) {
    return httpClient.post('/transfers', transferData)
  }

  /**
   * Validates transfer data before submission
   * @param transferData - Transfer data to validate
   * @returns Promise resolving to validation result
   */
  static async validateTransfer(transferData: any) {
    return httpClient.post('/transfers/validate', transferData)
  }

  /**
   * Gets a preview of transfer details including fees and estimated delivery
   * @param data - Transfer preview request data
   * @param data.amount - Transfer amount
   * @param data.fromCurrency - Source currency code
   * @param data.toCurrency - Target currency code
   * @param data.deliveryMethod - Chosen delivery method
   * @returns Promise resolving to transfer preview with fees and timing
   */
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return httpClient.post('/transfers/preview', data)
  }

  /**
   * Tracks the status of an existing transfer
   * @param transferId - The unique transfer identifier
   * @returns Promise resolving to transfer tracking information
   */
  static async trackTransfer(transferId: string) {
    return httpClient.get(`/transfers/${transferId}`)
  }

  /**
   * Retrieves the complete transfer history for the current user
   * @returns Promise resolving to array of historical transfers
   */
  static async getTransferHistory() {
    return httpClient.get('/transfers')
  }
}
