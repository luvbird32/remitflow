
import { ValidationResult } from './validationTypes'

export class DeliveryValidationService {
  static validateDeliveryFields(deliveryMethod: string, formData: any): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {}

    switch (deliveryMethod) {
      case 'bank':
        results.accountNumber = this.validateAccountNumber(formData.accountNumber)
        results.bankName = this.validateBankName(formData.bankName)
        break
      case 'card':
        results.cardNumber = this.validateCardNumber(formData.cardNumber)
        break
      case 'wallet':
        results.mobileNumber = this.validateMobileNumber(formData.mobileNumber)
        break
    }

    return results
  }

  private static validateAccountNumber(value: string): ValidationResult {
    if (!value?.trim()) {
      return { isValid: false, error: 'Account number is required' }
    }
    return { isValid: true }
  }

  private static validateBankName(value: string): ValidationResult {
    if (!value?.trim()) {
      return { isValid: false, error: 'Bank name is required' }
    }
    return { isValid: true }
  }

  private static validateCardNumber(value: string): ValidationResult {
    if (!value?.trim()) {
      return { isValid: false, error: 'Card number is required' }
    }
    const cleanNumber = value.replace(/\s/g, '')
    if (!/^\d{16}$/.test(cleanNumber)) {
      return { isValid: false, error: 'Please enter a valid 16-digit card number' }
    }
    return { isValid: true }
  }

  private static validateMobileNumber(value: string): ValidationResult {
    if (!value?.trim()) {
      return { isValid: false, error: 'Mobile number is required' }
    }
    return { isValid: true }
  }
}
