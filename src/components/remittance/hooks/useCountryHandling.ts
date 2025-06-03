
import { EnhancedApiService } from '@/services/enhancedApiService'
import { fallbackCountries } from '../utils/currencyUtils'
import { TransferFormData } from '../types'

export function useCountryHandling(updateFormData: (updates: Partial<TransferFormData>) => void) {
  const handleCountryChange = async (countryCode: string) => {
    try {
      console.log('Country selected:', countryCode)
      
      let country
      try {
        country = await EnhancedApiService.getCountry(countryCode)
      } catch (error) {
        country = fallbackCountries.find(c => c.code === countryCode)
      }
      
      updateFormData({
        recipientCountry: countryCode,
        toCurrency: country?.currency || 'EUR',
        deliveryMethod: ""
      })
    } catch (error) {
      console.error('Error handling country change:', error)
    }
  }

  return { handleCountryChange }
}
