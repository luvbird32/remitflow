
import { TransferFormData } from '../types'

export function useFormStepLogic(formData: TransferFormData) {
  // Determine which steps should be visible based on form completion
  const showStep2 = formData.amount && formData.recipientName && formData.recipientCountry
  const showStep3 = showStep2 && formData.deliveryMethod
  
  // Check if payment details are filled based on delivery method
  const hasPaymentDetails = () => {
    switch (formData.deliveryMethod) {
      case 'bank':
        return formData.bankName && formData.accountNumber
      case 'card':
        return formData.cardNumber && formData.cardIssuer
      case 'wallet':
        return formData.mobileNumber && formData.mobileProvider
      default:
        return false
    }
  }
  
  const showStep4 = showStep3 && hasPaymentDetails()

  return {
    showStep2,
    showStep3,
    showStep4,
    hasPaymentDetails: hasPaymentDetails()
  }
}
