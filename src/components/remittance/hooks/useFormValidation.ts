
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { useValidation } from './validation/ValidationContext'

export function useFormValidation() {
  const [isValidating, setIsValidating] = useState(false)
  const { validateField: contextValidateField, validateForm: contextValidateForm } = useValidation()

  const validateField = async (field: string, value: any) => {
    return await contextValidateField(field, value)
  }

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
