
import { ApiService } from '@/services/apiService'
import { fallbackCountries } from '../utils/currencyUtils'
import { TransferFormData } from '../types'

/**
 * Country Handling Hook
 * 
 * A custom React hook that manages country selection and related operations
 * in the remittance transfer form. This hook handles country changes,
 * currency updates, and delivery method availability.
 * 
 * Features:
 * - Handles country selection changes
 * - Automatically updates currency based on country
 * - Resets delivery method when country changes
 * - Provides fallback data when backend is unavailable
 * - Integrates with form data management
 * 
 * @param updateFormData - Function to update the transfer form data
 * @returns Object containing country handling functions
 * 
 * @example
 * ```typescript
 * const { handleCountryChange } = useCountryHandling(updateFormData);
 * 
 * // Handle country selection in a dropdown
 * <Select onValueChange={handleCountryChange}>
 *   {countries.map(country => (
 *     <SelectItem key={country.code} value={country.code}>
 *       {country.flag} {country.name}
 *     </SelectItem>
 *   ))}
 * </Select>
 * ```
 */
export function useCountryHandling(updateFormData: (updates: Partial<TransferFormData>) => void) {
  /**
   * Handles country selection changes and updates related form fields
   * 
   * When a user selects a different country, this function:
   * 1. Fetches detailed country information from the backend
   * 2. Updates the recipient country in the form
   * 3. Sets the appropriate currency for that country
   * 4. Resets the delivery method (since availability varies by country)
   * 5. Falls back to cached data if backend is unavailable
   * 
   * @param countryCode - The ISO country code (e.g., 'US', 'GB', 'NG')
   */
  const handleCountryChange = async (countryCode: string) => {
    try {
      console.log('Country selected:', countryCode)
      
      let country
      try {
        // Attempt to get detailed country information from backend
        country = await ApiService.getCountry(countryCode)
      } catch (error) {
        // Fallback to cached country data if backend is unavailable
        country = fallbackCountries.find(c => c.code === countryCode)
      }
      
      // Update form data with new country information
      updateFormData({
        recipientCountry: countryCode,
        toCurrency: country?.currency || 'EUR', // Default to EUR if currency not found
        deliveryMethod: "" // Reset delivery method when country changes
      })
    } catch (error) {
      console.error('Error handling country change:', error)
    }
  }

  return { handleCountryChange }
}
