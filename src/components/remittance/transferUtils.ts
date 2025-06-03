
// Re-export everything from the smaller utility modules
export * from './utils/currencyUtils'
export * from './utils/countryUtils' 
export * from './utils/deliveryUtils'
export * from './utils/apiUtils'
export * from './utils/stepValidation'

// For backwards compatibility, also export loadCurrenciesAndCountries directly
export const loadCurrenciesAndCountries = async () => {
  return Promise.resolve()
}

// UI labels for delivery methods (frontend only)
export const deliveryMethodLabels = {
  bank: 'Bank Transfer',
  card: 'Debit Card',
  wallet: 'Mobile Wallet'
}

// UI timeframes for delivery methods (frontend only)
export const deliveryTimeframes = {
  bank: '1-3 business days',
  card: '1-2 hours',
  wallet: 'Within minutes'
}

// Frontend fee calculation (for UI display only)
export const calculateFee = (amount: string, deliveryMethod: string): number => {
  if (!amount) return 0
  const transferAmount = parseFloat(amount)
  
  // Base fee structure
  let baseFee = 0
  if (transferAmount <= 100) baseFee = 2.99
  else if (transferAmount <= 500) baseFee = 4.99
  else baseFee = 7.99
  
  // Delivery method fees
  const deliveryFees = {
    bank: 0,
    card: 1.99,
    wallet: 0.99
  }
  
  const deliveryFee = deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0
  return baseFee + deliveryFee
}

// Frontend conversion calculation (for UI display only)
export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount) return "0.00"
  
  // Import currencies from currencyUtils
  const { currencies } = require('./utils/currencyUtils')
  
  const fromCurrencyData = currencies.find((c: any) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c: any) => c.code === toCurrency)
  
  if (!fromCurrencyData || !toCurrencyData) return "0.00"
  
  const fromRate = fromCurrencyData.rate || 1
  const toRate = toCurrencyData.rate || 1
  const rate = toRate / fromRate
  
  return (parseFloat(amount) * rate).toFixed(2)
}
