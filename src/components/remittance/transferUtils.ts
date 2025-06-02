
import { ApiService } from '@/services/apiService'

/**
 * Array of available currencies loaded from the backend
 */
export let currencies: any[] = []

/**
 * Array of available countries loaded from the backend
 */
export let countries: any[] = []

/**
 * Loads currencies and countries data from the backend API
 * Populates the module-level currencies and countries arrays
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
  } catch (error) {
    console.error('Failed to load currencies and countries:', error)
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
    console.error('Conversion error:', error)
    return "0"
  }
}

/**
 * Calculates transfer fee using backend API for accurate pricing
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
    console.error('Fee calculation error:', error)
    return 0
  }
}
