
import { TransferFormData } from '../../types'
import { fieldValidators } from './fieldValidators'
import { FormValidationResult } from './types'
import { ApiService } from '@/services/apiService'

/**
 * Complete form validation service
 */
export class FormValidator {
  /**
   * Validates the entire form and returns comprehensive validation results
   */
  static async validateForm(formData: TransferFormData): Promise<FormValidationResult> {
    const errors: Record<string, string> = {}

    try {
      // Validate all basic fields
      const validations = [
        { field: 'amount', value: formData.amount },
        { field: 'recipientName', value: formData.recipientName },
        { field: 'recipientEmail', value: formData.recipientEmail },
        { field: 'recipientCountry', value: formData.recipientCountry },
        { field: 'deliveryMethod', value: formData.deliveryMethod }
      ]

      for (const { field, value } of validations) {
        const validator = fieldValidators[field as keyof typeof fieldValidators]
        if (validator) {
          const result = validator(value)
          if (!result.isValid && result.error) {
            errors[field] = result.error
          }
        }
      }

      // Validate delivery-specific fields
      if (formData.deliveryMethod === 'bank') {
        const accountResult = fieldValidators.accountNumber(formData.accountNumber)
        if (!accountResult.isValid && accountResult.error) {
          errors.accountNumber = accountResult.error
        }

        const bankResult = fieldValidators.bankName(formData.bankName)
        if (!bankResult.isValid && bankResult.error) {
          errors.bankName = bankResult.error
        }
      } else if (formData.deliveryMethod === 'card') {
        const cardResult = fieldValidators.cardNumber(formData.cardNumber)
        if (!cardResult.isValid && cardResult.error) {
          errors.cardNumber = cardResult.error
        }
      } else if (formData.deliveryMethod === 'wallet') {
        const mobileResult = fieldValidators.mobileNumber(formData.mobileNumber)
        if (!mobileResult.isValid && mobileResult.error) {
          errors.mobileNumber = mobileResult.error
        }
      }

      // Backend validation
      try {
        await ApiService.validateTransfer(formData)
      } catch (validationError: any) {
        if (validationError.response?.data?.errors) {
          Object.assign(errors, validationError.response.data.errors)
        }
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      }
    } catch (error) {
      console.error('Form validation error:', error)
      return {
        isValid: false,
        errors: { general: 'Something went wrong. Please try again.' }
      }
    }
  }

  /**
   * Validates a single field
   */
  static validateField(field: string, value: any): { isValid: boolean; error?: string } {
    const validator = fieldValidators[field as keyof typeof fieldValidators]
    if (validator) {
      return validator(value)
    }
    return { isValid: true }
  }
}
