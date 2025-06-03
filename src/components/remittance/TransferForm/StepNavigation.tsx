
import { TransferFormData } from '../types'

interface UseStepNavigationProps {
  formData: TransferFormData
}

export function useStepNavigation({ formData }: UseStepNavigationProps) {
  // Step 2: Show when basic info is complete
  const showStep2 = !!(formData.amount && formData.recipientName && formData.recipientCountry)
  
  // Step 3: Show when delivery method is selected
  const showStep3 = showStep2 && !!formData.deliveryMethod
  
  // Step 4: Show when all previous steps are complete
  const showStep4 = showStep3

  return {
    showStep2,
    showStep3,
    showStep4
  }
}
