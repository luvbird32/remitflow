
import { httpClient } from '../httpClient'
import { TransferFormData } from '@/components/remittance/types'

/**
 * Base API Service for core transfer operations
 */
export class BaseApiService {
  /**
   * Creates a new transfer by calling the backend API
   */
  static async createTransfer(transferData: TransferFormData) {
    try {
      console.log('BaseApiService: Creating transfer with data:', transferData)
      
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
      console.log('BaseApiService: Transfer created successfully:', response)
      return response
    } catch (error) {
      console.error('BaseApiService: Transfer creation failed:', error)
      throw error
    }
  }

  /**
   * Validates transfer data before submission
   */
  static async validateTransfer(transferData: TransferFormData) {
    try {
      const response = await httpClient.post('/transfers/validate', transferData)
      return response
    } catch (error) {
      console.error('BaseApiService: Transfer validation failed:', error)
      throw error
    }
  }
}
