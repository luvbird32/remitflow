
import { useState, useEffect } from "react"
import { ApiService } from '@/services/apiService'

export function useDataLoading() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading currencies and countries from backend...')
        await ApiService.getCurrencies()
        await ApiService.getCountries()
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
