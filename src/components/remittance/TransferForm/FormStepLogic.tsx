
import { TransferFormData } from '../types'
import { validateStep1, validateStep2, validateStep3 } from '../utils/stepValidation'

export function useFormStepLogic(formData: TransferFormData) {
  // Determine which steps should be visible based on form completion
  const showStep2 = validateStep1(formData)
  const showStep3 = showStep2 && validateStep2(formData)
  const showStep4 = showStep3 && validateStep3(formData)

  return {
    showStep2,
    showStep3,
    showStep4,
    hasPaymentDetails: validateStep3(formData)
  }
}
