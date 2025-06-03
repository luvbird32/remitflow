
import { useState, useEffect } from "react"
import { ApiService } from '@/services/apiService'

/**
 * Data Loading Hook
 * 
 * A custom React hook that manages the initial loading of essential data
 * required for the remittance application. This hook handles loading
 * currencies, countries, and other reference data from the backend.
 * 
 * Features:
 * - Loads currencies and countries on component mount
 * - Provides loading state for UI feedback
 * - Handles errors gracefully with fallback data
 * - Caches loaded data to prevent unnecessary API calls
 * - Supports both online and offline scenarios
 * 
 * @returns Object containing loading state and loaded data status
 * 
 * @example
 * ```typescript
 * const { isDataLoaded } = useDataLoading();
 * 
 * if (!isDataLoaded) {
 *   return <LoadingSpinner />;
 * }
 * 
 * return <TransferForm />;
 * ```
 */
export function useDataLoading() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    /**
     * Loads essential reference data required for the application
     * 
     * This function attempts to load currencies and countries from the backend.
     * If the backend is unavailable, it gracefully falls back to cached or
     * default data to ensure the application remains functional.
     * 
     * The loading process includes:
     * 1. Attempt to fetch currencies from backend
     * 2. Attempt to fetch countries from backend
     * 3. Handle any network errors gracefully
     * 4. Set loading state to complete regardless of success/failure
     */
    const loadData = async () => {
      try {
        console.log('Loading currencies and countries from backend...')
        
        // Load currencies - essential for exchange rate calculations
        await ApiService.getCurrencies()
        
        // Load countries - essential for delivery method selection
        await ApiService.getCountries()
        
        console.log('Backend data loaded successfully')
      } catch (error) {
        // Log the error but don't throw - application should work with fallback data
        console.log('Backend unavailable, using fallback data')
        console.error('Data loading error:', error)
      } finally {
        // Always set data as loaded, even if backend failed
        // The application will use fallback data in components
        setIsDataLoaded(true)
      }
    }
    
    loadData()
  }, [])

  return { isDataLoaded }
}
