import { TransferFormData } from '../types'
import { TransferResult } from '../services/transferProcessingService'

export class TransferStorageUtils {
  static storeTransferInHistory(formData: TransferFormData, result: TransferResult): void {
    try {
      const existingTransfers = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      
      const newTransfer = {
        id: result.id,
        amount: parseFloat(formData.amount || '0'),
        currency: formData.fromCurrency,
        recipientName: formData.recipientName,
        recipientCountry: formData.recipientCountry,
        status: result.status,
        createdAt: result.createdAt,
        estimatedDelivery: result.estimatedDelivery,
        deliveryMethod: formData.deliveryMethod,
        convertedAmount: result.convertedAmount,
        toCurrency: formData.toCurrency,
        fee: result.fee,
        totalAmount: result.totalAmount
      }
      
      // Keep only the last 20 transfers
      const updatedTransfers = [newTransfer, ...existingTransfers.slice(0, 19)]
      localStorage.setItem('transferHistory', JSON.stringify(updatedTransfers))
      
      console.log('Transfer stored in history:', newTransfer)
    } catch (error) {
      console.error('Error storing transfer in history:', error)
    }
  }

  static updateTransferStatus(transferId: string, newStatus: string): void {
    try {
      const transferHistory = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      const updatedHistory = transferHistory.map((transfer: any) => {
        if (transfer.id === transferId) {
          return { ...transfer, status: newStatus }
        }
        return transfer
      })
      localStorage.setItem('transferHistory', JSON.stringify(updatedHistory))
      console.log(`Transfer ${transferId} status updated to: ${newStatus}`)
    } catch (error) {
      console.error('Error updating transfer status:', error)
    }
  }
}
