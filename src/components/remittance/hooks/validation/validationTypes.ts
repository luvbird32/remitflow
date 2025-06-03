
export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface FormValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface FieldValidationParams {
  field: string
  value: any
  formData?: any
}
