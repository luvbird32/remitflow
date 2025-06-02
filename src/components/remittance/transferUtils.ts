
import { ApiService } from '@/services/apiService'

export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  deliveryMethods: string[]
}

// Fallback data
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

export const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", deliveryMethods: ["bank", "card"] },
  { code: "EU", name: "European Union", flag: "🇪🇺", currency: "EUR", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", deliveryMethods: ["bank"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", deliveryMethods: ["bank", "card"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", deliveryMethods: ["bank", "card"] },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", deliveryMethods: ["bank"] },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", deliveryMethods: ["bank", "wallet"] },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", deliveryMethods: ["bank", "wallet"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", deliveryMethods: ["bank", "wallet"] },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", deliveryMethods: ["bank", "wallet"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", deliveryMethods: ["bank", "card"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", currency: "MXN", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", deliveryMethods: ["bank", "card"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP", deliveryMethods: ["bank", "wallet"] }
]

export const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  wallet: "Mobile Wallet"
}

export const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "Within 30 minutes",
  wallet: "Within 15 minutes"
}

export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
  const convertedAmount = (parseFloat(amount) / fromRate) * toRate
  return convertedAmount.toFixed(2)
}

export const calculateFee = (amount: string, deliveryMethod: string): number => {
  const baseAmount = parseFloat(amount)
  switch (deliveryMethod) {
    case 'bank':
      return 0 // Free
    case 'card':
      return 1.99
    case 'wallet':
      return 0.99
    default:
      return 0
  }
}

export const loadCurrenciesAndCountries = async () => {
  try {
    // Try to load from backend, but don't fail if unavailable
    const [currenciesData, countriesData] = await Promise.all([
      ApiService.getCurrencies().catch(() => currencies),
      ApiService.getCountries().catch(() => countries)
    ])
    
    // Type check and update the exported arrays if we got valid data from backend
    if (Array.isArray(currenciesData) && currenciesData.length > 0) {
      currencies.splice(0, currencies.length, ...currenciesData)
    }
    if (Array.isArray(countriesData) && countriesData.length > 0) {
      countries.splice(0, countries.length, ...countriesData)
    }
  } catch (error) {
    console.log('Backend unavailable, using fallback data')
  }
}
