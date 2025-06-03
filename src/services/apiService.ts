
import { httpClient } from './httpClient'
import { TransferFormData } from '@/components/remittance/types'

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
}
