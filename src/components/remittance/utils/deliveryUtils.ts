
// Frontend utility - only types and API communication
export interface DeliveryMethod {
  id: string
  name: string
  description: string
  estimatedTime: string
  fee: number
  available: boolean
}

// UI labels only - business logic moved to backend
export const deliveryMethodLabels = {
  bank: 'Bank Transfer',
  card: 'Debit Card', 
  wallet: 'Mobile Wallet'
}

export const deliveryTimeframes = {
  bank: '1-3 business days',
  card: '1-2 hours',
  wallet: 'Within minutes'
}

// All business logic moved to backend DeliveryService
