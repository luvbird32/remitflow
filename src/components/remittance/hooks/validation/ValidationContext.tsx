
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
    return await FieldValidationService.validateField(field, value)
  }

  const validateForm = async (formData: TransferFormData) => {
    return await FormValidationService.validateForm(formData)
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
