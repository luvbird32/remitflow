
import { ExchangeApiService } from '../exchangeApiService'
import { TransferApiService } from '../transferApiService'

/**
 * Transaction API Service for exchanges and transfers
 */
export class TransactionApiService {
  // Exchange methods
  static async convertCurrency(data: { amount: string; from: string; to: string }) {
    return ExchangeApiService.convertCurrency(data)
  }

  // Transfer methods
  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return TransferApiService.getTransferPreview(data)
  }

  static async trackTransfer(transferId: string) {
    return TransferApiService.trackTransfer(transferId)
  }

  static async getTransferHistory() {
    return TransferApiService.getTransferHistory()
  }
}
