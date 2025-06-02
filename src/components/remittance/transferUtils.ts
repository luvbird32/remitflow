
// This file now acts as a bridge to the backend API
// All business logic has been moved to the backend

import { ApiService } from '@/services/apiService'

// These will be loaded from the backend
export let currencies: any[] = []
export let countries: any[] = []

// Load data from backend
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

export const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  mobile: "Mobile Money"
}

export const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "1-2 hours", 
  mobile: "Within minutes"
}

// These functions now call the backend API
export const calculateConvertedAmount = async (amount: string, fromCurrency: string, toCurrency: string): Promise<string> => {
  if (!amount) return "0"
  try {
    const result = await ApiService.convertCurrency({ amount, from: fromCurrency, to: toCurrency })
    return result.convertedAmount
  } catch (error) {
    console.error('Conversion error:', error)
    return "0"
  }
}

export const calculateFee = async (amount: string, deliveryMethod: string): Promise<number> => {
  if (!amount) return 0
  try {
    const result = await ApiService.getTransferPreview({ amount, deliveryMethod, fromCurrency: 'USD', toCurrency: 'USD' })
    return result.fee
  } catch (error) {
    console.error('Fee calculation error:', error)
    return 0
  }
}
