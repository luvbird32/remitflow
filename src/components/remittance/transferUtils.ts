
// Frontend transfer utilities - UI data only, business logic moved to backend

// Re-export types for frontend use
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

// UI labels only - business logic moved to backend services
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

// Fallback data for UI - all business logic moved to backend
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

// All business logic functions moved to backend services:
// - calculateFee -> backend/src/services/feeService.ts
// - calculateConvertedAmount -> backend/src/services/currencyService.ts
// - All validation logic -> backend/src/services/validationService.ts
// - All transfer processing -> backend/src/services/transferService.ts

// Deprecated functions - use backend services instead
export const calculateFee = (amount: string, deliveryMethod: string): number => {
  console.warn('calculateFee is deprecated. Use backend FeeService instead.')
  return 0
}

export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  console.warn('calculateConvertedAmount is deprecated. Use backend CurrencyService instead.')
  return "0.00"
}
