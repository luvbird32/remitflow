
export interface DeliveryMethod {
  id: string
  name: string
  description: string
  estimatedTime: string
  fee: number
  available: boolean
}

// Note: This is just a type definition file now.
// All business logic has been moved to the backend DeliveryService.
// These are fallback delivery methods only used when the backend is unavailable.
export const getDeliveryMethods = (countryCode: string): DeliveryMethod[] => {
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

  // Fallback logic - in production this would come from backend
  const allMethods = Object.values(baseDeliveryMethods)
  return allMethods
}
