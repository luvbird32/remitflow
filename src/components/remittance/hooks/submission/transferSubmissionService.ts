
import { TransferFormData } from '../../types'
import { ApiService } from '@/services/apiService'
import { TransferProcessingService } from '../../services/transferProcessingService'
import { TransferStorageUtils } from '../../utils/transferStorageUtils'

/**
 * Transfer Submission Service
 * Handles the core logic for submitting transfers
 */
export class TransferSubmissionService {
  /**
   * Submit transfer via API with fallback to local processing
   */
  static async submitTransfer(formData: TransferFormData) {
    console.log('Submitting transfer with data:', formData)
    
    let result
    try {
      // Attempt to create transfer via API
      result = await ApiService.createTransfer(formData)
      console.log('Transfer API response:', result)
    } catch (apiError) {
      // Fallback to local processing if API unavailable
      console.log('Backend unavailable, simulating transfer processing')
      console.error('API Error:', apiError)
      
      result = await TransferProcessingService.simulateTransferProcessing(formData)
    }

    if (result) {
      // Store transfer in local history for tracking
      TransferStorageUtils.storeTransferInHistory(formData, result)
      
      // Simulate realistic status updates for demo purposes
      this.scheduleStatusUpdates(result)
    }

    return result
  }

  /**
   * Schedule status updates for demo purposes
   */
  private static scheduleStatusUpdates(result: any) {
    setTimeout(() => {
      TransferStorageUtils.updateTransferStatus(result.id, 'processing')
    }, 30000) // Update to processing after 30 seconds

    if (result.status === 'pending') {
      setTimeout(() => {
        TransferStorageUtils.updateTransferStatus(result.id, 'delivered')
      }, 120000) // Update to delivered after 2 minutes
    }
  }
}
