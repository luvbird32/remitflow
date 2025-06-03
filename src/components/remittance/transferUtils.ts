
// Re-export everything from the smaller utility modules
export * from './utils/currencyUtils'
export * from './utils/countryUtils' 
export * from './utils/deliveryUtils'
export * from './utils/apiUtils'
export * from './utils/stepValidation'

// For backwards compatibility - all data now comes from backend
export const loadCurrenciesAndCountries = async () => {
  return Promise.resolve()
}

// Legacy exports for components that still reference them
// All actual business logic moved to backend services
export const currencies = []
export const countries = []

// UI-only constants (no business logic)
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

// These functions now only serve as fallbacks - real logic is in backend
export const calculateFee = (amount: string, deliveryMethod: string): number => {
  console.log('Using frontend fallback for fee calculation')
  return 2.99 // Simple fallback
}

export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  console.log('Using frontend fallback for conversion')
  return amount // Simple fallback
}
