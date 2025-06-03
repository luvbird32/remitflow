
import { createContext, useContext, ReactNode } from 'react'
import { ValidationResult, FormValidationResult } from './validationTypes'
import { FieldValidationService } from './fieldValidationService'
import { FormValidationService } from './formValidationService'
import { TransferFormData } from '../../types'

interface ValidationContextType {
  validateField: (field: string, value: any) => Promise<ValidationResult>
  validateForm: (formData: TransferFormData) => Promise<FormValidationResult>
}

const ValidationContext = createContext<ValidationContextType | null>(null)

export function ValidationProvider({ children }: { children: ReactNode }) {
  const validateField = async (field: string, value: any) => {
    try {
      console.log('ValidationProvider: Validating field:', field, 'with value:', value)
      const result = await FieldValidationService.validateField(field, value)
      console.log('ValidationProvider: Field validation result:', result)
      return result
    } catch (error) {
      console.error('ValidationProvider: Field validation error:', error)
      return { isValid: false, error: 'Validation failed' }
    }
  }

  const validateForm = async (formData: TransferFormData) => {
    try {
      console.log('ValidationProvider: Validating form with data:', formData)
      const result = await FormValidationService.validateForm(formData)
      console.log('ValidationProvider: Form validation result:', result)
      return result
    } catch (error) {
      console.error('ValidationProvider: Form validation error:', error)
      return {
        isValid: false,
        errors: { general: 'Form validation failed. Please check your inputs.' }
      }
    }
  }

  return (
    <ValidationContext.Provider value={{ validateField, validateForm }}>
      {children}
    </ValidationContext.Provider>
  )
}

export function useValidation() {
  const context = useContext(ValidationContext)
  if (!context) {
    throw new Error('useValidation must be used within ValidationProvider')
  }
  return context
}
