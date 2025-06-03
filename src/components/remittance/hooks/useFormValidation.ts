
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { FieldValidationService } from './validation/fieldValidationService'
import { FormValidationService } from './validation/formValidationService'

/**
 * Simplified Form Validation Hook
 * 
 * A streamlined React hook for form validation that delegates
 * the actual validation logic to dedicated validator services.
 */
export function useFormValidation() {
  const [isValidating, setIsValidating] = useState(false)

  /**
   * Validates a single form field
   */
  const validateField = async (field: string, value: any, formData?: TransferFormData) => {
    return await FieldValidationService.validateField(field, value)
  }

  /**
   * Validates the entire form
   */
  const validateForm = async (formData: TransferFormData): Promise<{ isValid: boolean; errors: FormErrors }> => {
    setIsValidating(true)
    
    try {
      const result = await FormValidationService.validateForm(formData)
      return {
        isValid: result.isValid,
        errors: result.errors as FormErrors
      }
    } catch (error) {
      console.error('Form validation error:', error)
      return {
        isValid: false,
        errors: { general: 'Something went wrong. Please try again.' }
      }
    } finally {
      setIsValidating(false)
    }
  }

  return {
    validateForm,
    validateField,
    isValidating
  }
}
