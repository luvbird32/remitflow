
import { ApiService } from '@/services/apiService'
import { currencies } from './currencyUtils'
import { countries } from './countryUtils'

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
