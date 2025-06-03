
import { TransferFormData, FormErrors } from '../types'
import { EnhancedApiService } from '@/services/enhancedApiService'

export function useFormValidation() {
  const validateForm = async (formData: TransferFormData): Promise<{ isValid: boolean; errors: FormErrors }> => {
    try {
      // Try to validate using backend API
      const response = await EnhancedApiService.validateTransfer(formData)
      return { isValid: true, errors: {} }
    } catch (error: any) {
      // If backend validation fails, fall back to frontend validation
      console.log('Backend validation unavailable, using frontend validation')
      return validateFormFrontend(formData)
    }
  }

  const validateFormFrontend = (formData: TransferFormData): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {}

    // Validate amount
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (parseFloat(formData.amount) < 1) {
      newErrors.amount = "Minimum transfer amount is $1"
    } else if (parseFloat(formData.amount) > 50000) {
      newErrors.amount = "Maximum transfer amount is $50,000"
    }

    // Validate recipient name
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required"
    } else if (formData.recipientName.trim().length < 2) {
      newErrors.recipientName = "Recipient name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.recipientName.trim())) {
      newErrors.recipientName = "Recipient name can only contain letters and spaces"
    }

    // Validate recipient email if provided
    if (formData.recipientEmail && formData.recipientEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.recipientEmail)) {
        newErrors.recipientEmail = "Please enter a valid email address"
      }
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
      if (!formData.accountNumber || formData.accountNumber.trim().length === 0) {
        newErrors.accountNumber = "Account number is required"
      } else if (formData.accountNumber.trim().length < 8) {
        newErrors.accountNumber = "Account number must be at least 8 characters"
      }
      
      if (!formData.bankName || formData.bankName.trim().length === 0) {
        newErrors.bankName = "Bank name is required"
      }
    } else if (formData.deliveryMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.trim().length === 0) {
        newErrors.cardNumber = "Card number is required"
      } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = "Please enter a valid card number"
      }
      
      if (!formData.cardIssuer || formData.cardIssuer.trim().length === 0) {
        newErrors.cardIssuer = "Card issuer is required"
      }
    } else if (formData.deliveryMethod === 'wallet') {
      if (!formData.mobileNumber || formData.mobileNumber.trim().length === 0) {
        newErrors.mobileNumber = "Mobile number is required"
      } else if (!/^\+?[\d\s\-()]+$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Please enter a valid mobile number"
      }
      
      if (!formData.mobileProvider || formData.mobileProvider.trim().length === 0) {
        newErrors.mobileProvider = "Mobile provider is required"
      }
    }

    // Validate payment information in final step
    if (formData.paymentCardNumber) {
      const cardNumber = formData.paymentCardNumber.replace(/\s/g, '')
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        newErrors.paymentCardNumber = "Please enter a valid card number"
      }
    }

    if (formData.paymentExpiry) {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
      if (!expiryRegex.test(formData.paymentExpiry)) {
        newErrors.paymentExpiry = "Please enter expiry date as MM/YY"
      }
    }

    if (formData.paymentCvv) {
      if (!/^\d{3,4}$/.test(formData.paymentCvv)) {
        newErrors.paymentCvv = "Please enter a valid CVV"
      }
    }

    if (formData.paymentName) {
      if (formData.paymentName.trim().length < 2) {
        newErrors.paymentName = "Cardholder name must be at least 2 characters"
      }
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    }
  }

  return { validateForm }
}
