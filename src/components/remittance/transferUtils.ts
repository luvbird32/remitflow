
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

// Synchronous calculation functions using local data (for UI previews)
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
    mobile: 0.99
  }
  
  return baseFee + (deliveryFees[deliveryMethod as keyof typeof deliveryFees] || 0)
}

// Async functions for actual API calls
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
