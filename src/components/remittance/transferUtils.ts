

// Countries data for the transfer form
export const countries = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", deliveryMethods: ["bank", "card"] },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", deliveryMethods: ["bank", "card"] },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "GH", name: "Ghana", currency: "GHS", flag: "🇬🇭", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "ZA", name: "South Africa", currency: "ZAR", flag: "🇿🇦", deliveryMethods: ["bank", "card"] },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵", deliveryMethods: ["bank", "card"] },
  { code: "IN", name: "India", currency: "INR", flag: "🇮🇳", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "PH", name: "Philippines", currency: "PHP", flag: "🇵🇭", deliveryMethods: ["bank", "card", "wallet"] }
]

export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 411 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 110 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", rate: 6.1 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 14.8 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.25 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 74 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", rate: 50 }
]

// Currency type interface
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

// Delivery method labels and timeframes
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

// Fee calculation function
export const calculateFee = (amount: string, deliveryMethod: string): number => {
  if (!amount) return 0
  const transferAmount = parseFloat(amount)
  
  // Base fee based on amount
  let baseFee = 0
  if (transferAmount <= 100) baseFee = 2.99
  else if (transferAmount <= 500) baseFee = 4.99
  else baseFee = 7.99
  
  // Delivery method fee
  const deliveryFees = {
    bank: 0,
    card: 1.99,
    wallet: 0.99
  }
  
  const deliveryFee = deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0
  
  return baseFee + deliveryFee
}

// Currency conversion function
export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount || parseFloat(amount) <= 0) return "0.00"
  
  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)
  
  if (!fromCurrencyData || !toCurrencyData) return "0.00"
  
  const fromRate = fromCurrencyData.rate
  const toRate = toCurrencyData.rate
  const rate = toRate / fromRate
  
  const convertedAmount = parseFloat(amount) * rate
  return convertedAmount.toFixed(2)
}

