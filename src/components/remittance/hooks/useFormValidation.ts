
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { useValidation } from './validation/ValidationContext'

/**
 * Simplified Form Validation Hook
 * 
 * A streamlined React hook for form validation that uses the validation context
 */
export function useFormValidation() {
  const [isValidating, setIsValidating] = useState(false)
  const { validateField: contextValidateField, validateForm: contextValidateForm } = useValidation()

  /**
   * Validates a single form field
   */
  const validateField = async (field: string, value: any) => {
    return await contextValidateField(field, value)
  }

  /**
   * Validates the entire form
   */
  const validateForm = async (formData: TransferFormData): Promise<{ isValid: boolean; errors: FormErrors }> => {
    setIsValidating(true)
    
    try {
      const result = await contextValidateForm(formData)
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
