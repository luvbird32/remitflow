
import { TransferFormData, FormErrors } from '../types'

export function useFormValidation() {
  const validateForm = (formData: TransferFormData): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {}

    // Validate amount
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (parseFloat(formData.amount) < 1) {
      newErrors.amount = "Minimum transfer amount is $1"
    } else if (parseFloat(formData.amount) > 10000) {
      newErrors.amount = "Maximum transfer amount is $10,000"
    }

    // Validate recipient name
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required"
    }

    // Validate recipient country
    if (!formData.recipientCountry) {
      newErrors.recipientCountry = "Please select recipient country"
    }

    // Validate delivery method
    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = "Please select delivery method"
    }

    // Validate payment details based on delivery method
    if (formData.deliveryMethod === 'bank') {
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Account number is required"
      }
      if (!formData.bankName) {
        newErrors.bankName = "Bank name is required"
      }
    } else if (formData.deliveryMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      }
      if (!formData.cardIssuer) {
        newErrors.cardIssuer = "Card issuer is required"
      }
    } else if (formData.deliveryMethod === 'wallet') {
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = "Mobile number is required"
      }
      if (!formData.mobileProvider) {
        newErrors.mobileProvider = "Mobile provider is required"
      }
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    }
  }

  return { validateForm }
}
