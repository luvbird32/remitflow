
import { TransferRequest } from '../types/transfer'

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
  static async simulateTransferProcessing(transferData: TransferRequest): Promise<TransferResult> {
    // Calculate realistic converted amount based on transfer data
    const amount = parseFloat(transferData.amount || '0')
    const exchangeRate = this.getExchangeRate(transferData.fromCurrency, transferData.toCurrency)
    const convertedAmount = (amount * exchangeRate).toFixed(2)
    
    // Calculate fees based on delivery method
    const fee = this.calculateFee(amount, transferData.deliveryMethod)
    const totalAmount = (amount + fee).toFixed(2)
    
    // Generate realistic transfer ID with timestamp
    const transferId = `TXN${Date.now().toString().slice(-8)}`
    
    // Simulate processing delay with progress updates
    await new Promise(resolve => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 25
        if (progress >= 100) {
          clearInterval(interval)
          resolve(true)
        }
      }, 500)
    })
    
    // Determine initial status based on delivery method
    const status = this.getInitialStatus(transferData.deliveryMethod)
    
    return {
      id: transferId,
      status,
      convertedAmount,
      fee,
      totalAmount,
      estimatedDelivery: this.getEstimatedDelivery(transferData.deliveryMethod),
      actualDelivery: status === 'delivered' ? new Date().toISOString() : undefined,
      recipientName: transferData.recipientName,
      recipientCountry: transferData.recipientCountry,
      deliveryMethod: transferData.deliveryMethod,
      fromCurrency: transferData.fromCurrency,
      toCurrency: transferData.toCurrency,
      createdAt: new Date().toISOString(),
      trackingUrl: `https://track.remitflow.com/${transferId}`
    }
  }

  private static getInitialStatus(deliveryMethod: string): string {
    if (deliveryMethod === 'wallet') {
      return Math.random() > 0.7 ? 'delivered' : 'processing'
    } else if (deliveryMethod === 'card') {
      return Math.random() > 0.5 ? 'processing' : 'pending'
    }
    return 'pending'
  }

  private static getExchangeRate(from: string, to: string): number {
    const baseRates: Record<string, number> = {
      'USD': 1,
      'EUR': 0.85 + (Math.random() - 0.5) * 0.02,
      'GBP': 0.73 + (Math.random() - 0.5) * 0.02,
      'JPY': 110.25 + (Math.random() - 0.5) * 2,
      'CAD': 1.35 + (Math.random() - 0.5) * 0.05,
      'NGN': 461.50 + (Math.random() - 0.5) * 10,
      'KES': 147.25 + (Math.random() - 0.5) * 5,
      'GHS': 12.15 + (Math.random() - 0.5) * 0.5,
      'ZAR': 18.75 + (Math.random() - 0.5) * 1
    }
    
    const fromRate = baseRates[from] || 1
    const toRate = baseRates[to] || 1
    return Number((toRate / fromRate).toFixed(4))
  }

  private static calculateFee(amount: number, deliveryMethod: string): number {
    let baseFee = 0
    
    if (amount <= 50) baseFee = 1.99
    else if (amount <= 100) baseFee = 2.99
    else if (amount <= 500) baseFee = 4.99
    else if (amount <= 1000) baseFee = 7.99
    else baseFee = 9.99

    const deliveryFees = {
      bank: 0,
      card: 1.99,
      wallet: 0.99
    }

    return Number((baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)).toFixed(2))
  }

  private static getEstimatedDelivery(deliveryMethod: string): string {
    const timeframes = {
      bank: "1-3 business days",
      card: "Within 2 hours",
      wallet: "Within 15 minutes"
    }
    return timeframes[deliveryMethod as keyof typeof timeframes] || "2-5 business days"
  }
}
