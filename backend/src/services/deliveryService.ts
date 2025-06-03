
export interface DeliveryMethod {
  id: string
  name: string
  description: string
  estimatedTime: string
  fee: number
  available: boolean
}

export class DeliveryService {
  static getDeliveryMethods(countryCode: string): DeliveryMethod[] {
    const baseDeliveryMethods: Record<string, DeliveryMethod> = {
      bank: {
        id: 'bank',
        name: 'Bank Transfer',
        description: 'Direct transfer to bank account',
        estimatedTime: '1-3 business days',
        fee: 0,
        available: true
      },
      card: {
        id: 'card',
        name: 'Debit Card',
        description: 'Transfer to recipient\'s debit card',
        estimatedTime: '1-2 hours',
        fee: 1.99,
        available: true
      },
      wallet: {
        id: 'wallet',
        name: 'Mobile Wallet',
        description: 'Transfer to mobile money wallet',
        estimatedTime: 'Within minutes',
        fee: 0.99,
        available: true
      }
    }

    // Import country service to get available methods
    const { CountryService } = require('./countryService')
    const availableMethods = CountryService.getDeliveryMethods(countryCode)
    
    return availableMethods.map(methodId => baseDeliveryMethods[methodId]).filter(Boolean)
  }

  static calculateDeliveryFee(deliveryMethod: string): number {
    const deliveryFees = {
      bank: 0,
      card: 1.99,
      wallet: 0.99
    }
    
    return deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0
  }

  static getEstimatedDelivery(deliveryMethod: string): string {
    const timeframes = {
      bank: "1-3 business days",
      card: "1-2 hours", 
      wallet: "Within minutes"
    }
    return timeframes[deliveryMethod as keyof typeof timeframes] || "Unknown"
  }
}
