
import { TransferFormData } from '../types'

export const validateStep1 = (formData: TransferFormData): boolean => {
  return !!(formData.amount && formData.recipientName && formData.recipientCountry)
}

export const validateStep2 = (formData: TransferFormData): boolean => {
  return !!formData.deliveryMethod
}

export const validateStep3 = (formData: TransferFormData): boolean => {
  switch (formData.deliveryMethod) {
    case 'bank':
      return !!(formData.bankName && formData.accountNumber)
    case 'card':
      return !!(formData.cardNumber && formData.cardIssuer)
    case 'wallet':
      return !!(formData.mobileNumber && formData.mobileProvider)
    default:
      return false
  }
}
