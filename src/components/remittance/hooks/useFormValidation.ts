
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { FormValidator } from './validation/formValidator'

/**
 * Simplified Form Validation Hook
 * 
 * A streamlined React hook for form validation that delegates
 * the actual validation logic to dedicated validator classes.
 */
export function useFormValidation() {
  const [isValidating, setIsValidating] = useState(false)

  /**
   * Validates a single form field
   */
  const validateField = async (field: string, value: any, formData?: TransferFormData) => {
    try {
      return FormValidator.validateField(field, value)
    } catch (error) {
      console.error('Field validation error:', error)
      return { isValid: false, error: 'Validation failed' }
    }
  }

  /**
   * Validates the entire form
   */
  const validateForm = async (formData: TransferFormData): Promise<{ isValid: boolean; errors: FormErrors }> => {
    setIsValidating(true)
    
    try {
      const result = await FormValidator.validateForm(formData)
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
