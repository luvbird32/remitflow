
import { useState, useEffect } from "react"
import { ApiService } from '@/services/apiService'
import { Currency } from '../transferUtils'
import { ConversionResult } from '../types'

export function useExchangeCalculator() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load currencies from backend
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await ApiService.getCurrencies()
        if (Array.isArray(data)) {
          setCurrencies(data)
        }
      } catch (error) {
        console.error('Failed to load currencies:', error)
      }
    }
    loadCurrencies()
  }, [])

  // Calculate conversion when inputs change
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateConversion()
    } else {
      setConversionResult(null)
    }
  }, [amount, fromCurrency, toCurrency])

  const calculateConversion = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setConversionResult(null)
      return
    }
    
    setIsLoading(true)
    try {
      const result = await ApiService.convertCurrency({
        amount,
        from: fromCurrency,
        to: toCurrency
      })
      setConversionResult(result)
    } catch (error) {
      console.error('Conversion error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    conversionResult,
    isLoading,
    swapCurrencies
  }
}
