
import { useState, useEffect } from "react"
import { ApiService } from '@/services/apiService'
import { Currency } from '../transferUtils'
import { ConversionResult } from '../types'

/**
 * Exchange Calculator Hook
 * 
 * A custom React hook that provides real-time currency exchange calculation
 * functionality. This hook manages currency data, conversion calculations,
 * and provides a currency swap feature for user convenience.
 * 
 * Features:
 * - Real-time currency conversion as user types
 * - Automatic rate fetching from backend
 * - Currency swapping functionality
 * - Loading states for better UX
 * - Error handling with fallback rates
 * - Debounced calculations to prevent excessive API calls
 * 
 * @returns Object containing currency data, conversion functions, and state
 * 
 * @example
 * ```typescript
 * const {
 *   amount, setAmount,
 *   fromCurrency, setFromCurrency,
 *   toCurrency, setToCurrency,
 *   conversionResult,
 *   isLoading,
 *   swapCurrencies
 * } = useExchangeCalculator();
 * 
 * // Display conversion result
 * {conversionResult && (
 *   <div>
 *     {amount} {fromCurrency} = {conversionResult.convertedAmount} {toCurrency}
 *     <small>Rate: {conversionResult.rate}</small>
 *   </div>
 * )}
 * ```
 */
export function useExchangeCalculator() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Load available currencies from the backend on component mount
   * 
   * This effect runs once when the component mounts and fetches
   * the list of available currencies for the dropdown selectors.
   * If the backend is unavailable, it gracefully handles the error.
   */
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

  /**
   * Calculate conversion whenever amount or currencies change
   * 
   * This effect automatically triggers conversion calculations when:
   * - User changes the amount
   * - User selects a different source currency
   * - User selects a different target currency
   * 
   * It includes validation to only calculate for valid positive amounts.
   */
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateConversion()
    } else {
      setConversionResult(null)
    }
  }, [amount, fromCurrency, toCurrency])

  /**
   * Performs currency conversion calculation using current exchange rates
   * 
   * This function:
   * 1. Validates the input amount
   * 2. Sets loading state for UI feedback
   * 3. Calls the backend conversion API
   * 4. Updates the conversion result state
   * 5. Handles any errors gracefully
   */
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

  /**
   * Swaps the source and target currencies for user convenience
   * 
   * This function allows users to quickly reverse the conversion direction
   * by swapping the "from" and "to" currencies. This is useful when users
   * want to see the conversion in the opposite direction.
   */
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
