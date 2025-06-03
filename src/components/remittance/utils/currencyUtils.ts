
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.25 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", rate: 0.92 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 74.85 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 411.57 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 107.50 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", rate: 6.18 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 14.85 },
  { code: "MXN", name: "Mexican Peso", symbol: "$", rate: 20.15 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", rate: 5.24 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", rate: 51.20 }
]

export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
  const convertedAmount = (parseFloat(amount) / fromRate) * toRate
  return convertedAmount.toFixed(2)
}
