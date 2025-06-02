import { ApiService } from '@/services/apiService'

/**
 * Fallback currencies data when backend is unavailable
 */
const fallbackCurrencies = [
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

/**
 * Fallback countries data when backend is unavailable
 */
const fallbackCountries = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", deliveryMethods: ["bank", "card"] },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", deliveryMethods: ["bank", "card"] },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "GH", name: "Ghana", currency: "GHS", flag: "🇬🇭", deliveryMethods: ["bank", "card", "mobile"] },
  { code: "ZA", name: "South Africa", currency: "ZAR", flag: "🇿🇦", deliveryMethods: ["bank", "card"] },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵", deliveryMethods: ["bank", "card"] }
]

/**
 * Array of available currencies loaded from the backend or fallback data
 */
export let currencies: any[] = [...fallbackCurrencies]

/**
 * Array of available countries loaded from the backend or fallback data
 */
export let countries: any[] = [...fallbackCountries]

/**
 * Loads currencies and countries data from the backend API
 * Falls back to local data if backend is unavailable
 */
export const loadCurrenciesAndCountries = async () => {
  try {
    const [currenciesData, countriesData] = await Promise.all([
      ApiService.getCurrencies(),
      ApiService.getCountries()
    ])
    currencies.length = 0
    currencies.push(...currenciesData)
    countries.length = 0
    countries.push(...countriesData)
    console.log('Successfully loaded data from backend')
  } catch (error) {
    console.log('Backend unavailable, using fallback data')
    // Keep using fallback data that's already loaded
  }
}

// Initialize data on module load
loadCurrenciesAndCountries()

/**
 * Human-readable labels for delivery methods
 */
export const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  mobile: "Mobile Money"
}

/**
 * Expected delivery timeframes for each delivery method
 */
export const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "1-2 hours", 
  mobile: "Within minutes"
}

/**
 * Calculates converted amount using local exchange rates (for UI previews)
 * @param amount - Amount to convert
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Converted amount as string with 2 decimal places
 */
export const calculateConvertedAmount = (amount: string, fromCurrency: string, toCurrency: string): string => {
  if (!amount) return "0"
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
  return (parseFloat(amount) / fromRate * toRate).toFixed(2)
}

/**
 * Calculates transfer fee based on amount and delivery method
 * @param amount - Transfer amount
 * @param deliveryMethod - Selected delivery method
 * @returns Transfer fee as number
 */
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
    mobile: 0.99
  }
  
  return baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)
}

/**
 * Calculates converted amount using backend API for accurate rates
 * Falls back to local calculation if backend is unavailable
 * @param amount - Amount to convert
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Promise resolving to converted amount as string
 */
export const calculateConvertedAmountAPI = async (amount: string, fromCurrency: string, toCurrency: string): Promise<string> => {
  if (!amount) return "0"
  try {
    const result = await ApiService.convertCurrency({ amount, from: fromCurrency, to: toCurrency })
    return result.convertedAmount
  } catch (error) {
    console.log('Using local conversion calculation')
    return calculateConvertedAmount(amount, fromCurrency, toCurrency)
  }
}

/**
 * Calculates transfer fee using backend API for accurate pricing
 * Falls back to local calculation if backend is unavailable
 * @param amount - Transfer amount
 * @param deliveryMethod - Selected delivery method
 * @returns Promise resolving to transfer fee as number
 */
export const calculateFeeAPI = async (amount: string, deliveryMethod: string): Promise<number> => {
  if (!amount) return 0
  try {
    const result = await ApiService.getTransferPreview({ amount, deliveryMethod, fromCurrency: 'USD', toCurrency: 'USD' })
    return result.fee
  } catch (error) {
    console.log('Using local fee calculation')
    return calculateFee(amount, deliveryMethod)
  }
}
