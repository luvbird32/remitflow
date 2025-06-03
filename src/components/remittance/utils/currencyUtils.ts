
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

// Note: This is just a type definition file now.
// All business logic has been moved to the backend CurrencyService.
// These fallback currencies are only used when the backend is unavailable.
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.25 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 461.50 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 147.25 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", rate: 12.15 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.75 }
]

// Fallback functions for when backend is unavailable
export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount) return "0"
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
  return (parseFloat(amount) / fromRate * toRate).toFixed(2)
}

export const calculateFee = (amount: string, deliveryMethod: string): number => {
  if (!amount) return 0
  const transferAmount = parseFloat(amount)
  let baseFee = 0
  if (transferAmount <= 100) baseFee = 2.99
  else if (transferAmount <= 500) baseFee = 4.99
  else baseFee = 7.99

  const deliveryFees = {
    bank: 0,
    card: 1.99,
    wallet: 0.99
  }
  
  return baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)
}
