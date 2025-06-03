
import { TransferFormData } from '../types'

interface StepNavigationProps {
  formData: TransferFormData
}

export function useStepNavigation({ formData }: StepNavigationProps) {
  const showStep2 = Boolean(
    formData.amount && 
    formData.recipientName && 
    formData.recipientCountry
  )
  
  const showStep3 = Boolean(
    showStep2 && 
    formData.deliveryMethod
  )
  
  const showStep4 = Boolean(
    showStep3 && 
    isPaymentDetailsComplete(formData)
  )

  return { showStep2, showStep3, showStep4 }
}

function isPaymentDetailsComplete(formData: TransferFormData): boolean {
  switch (formData.deliveryMethod) {
    case 'bank':
      return Boolean(formData.accountNumber && formData.bankName)
    case 'card':
      return Boolean(formData.cardNumber && formData.cardIssuer)
    case 'wallet':
      return Boolean(formData.mobileNumber && formData.mobileProvider)
    default:
      return false
  }
}
