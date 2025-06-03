
import { useState, useEffect } from "react"
import { EnhancedApiService } from '@/services/enhancedApiService'

export function useDataLoading() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading currencies and countries from backend...')
        await EnhancedApiService.getCurrencies()
        await EnhancedApiService.getCountries()
        console.log('Backend data loaded successfully')
      } catch (error) {
        console.log('Backend unavailable, using fallback data')
        console.error('Data loading error:', error)
      } finally {
        setIsDataLoaded(true)
      }
    }
    loadData()
  }, [])

  return { isDataLoaded }
}
