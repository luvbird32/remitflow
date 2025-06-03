
import { TransferFormData } from '../../types'
import { ApiService } from '@/services/apiService'
import { TransferProcessingService } from '../../services/transferProcessingService'
import { TransferStorageUtils } from '../../utils/transferStorageUtils'

export class TransferSubmissionService {
  static async submitTransfer(formData: TransferFormData) {
    console.log('Submitting transfer with data:', formData)
    
    let result
    try {
      result = await ApiService.createTransfer(formData)
      console.log('Transfer API response:', result)
    } catch (apiError) {
      console.log('Backend unavailable, simulating transfer processing')
      console.error('API Error:', apiError)
      
      result = await TransferProcessingService.simulateTransferProcessing(formData)
    }

    if (result) {
      TransferStorageUtils.storeTransferInHistory(formData, result)
    }

    return result
  }
}
