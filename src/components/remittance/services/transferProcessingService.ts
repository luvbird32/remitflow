
// Frontend transfer processing service - API calls only, business logic moved to backend

import { TransferFormData } from '../types'

export interface TransferResult {
  id: string
  status: string
  convertedAmount: string
  fee: number
  totalAmount: string
  estimatedDelivery: string
  actualDelivery?: string
  recipientName: string
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
  createdAt: string
  trackingUrl: string
}

export class TransferProcessingService {
  static async simulateTransferProcessing(formData: TransferFormData): Promise<TransferResult> {
    // This is a fallback for when backend is unavailable
    // All business logic has been moved to backend/src/services/transferProcessingService.ts
    
    console.log('Frontend fallback: simulating transfer processing')
    
    // Minimal fallback data for UI
    const transferId = `TXN${Date.now().toString().slice(-8)}`
    
    return {
      id: transferId,
      status: 'pending',
      convertedAmount: formData.amount || '0.00',
      fee: 2.99,
      totalAmount: (parseFloat(formData.amount || '0') + 2.99).toFixed(2),
      estimatedDelivery: '1-3 business days',
      recipientName: formData.recipientName,
      recipientCountry: formData.recipientCountry,
      deliveryMethod: formData.deliveryMethod,
      fromCurrency: formData.fromCurrency,
      toCurrency: formData.toCurrency,
      createdAt: new Date().toISOString(),
      trackingUrl: `https://track.remitflow.com/${transferId}`
    }
  }
}
