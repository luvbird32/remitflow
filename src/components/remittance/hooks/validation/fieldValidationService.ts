
import { ValidationResult } from './validationTypes'
import { fieldValidators } from './fieldValidators'

/**
 * Field Validation Service
 * 
 * Handles validation of individual form fields using dedicated validators
 */
export class FieldValidationService {
  /**
   * Validates a single form field
   */
  static async validateField(field: string, value: any): Promise<ValidationResult> {
    try {
      const validator = fieldValidators[field as keyof typeof fieldValidators]
      if (validator) {
        return validator(value)
      }
      return { isValid: true }
    } catch (error) {
      console.error('Field validation error:', error)
      return { isValid: false, error: 'Validation failed' }
    }
  }

  /**
   * Validates multiple fields at once
   */
  static async validateFields(fields: Array<{ field: string; value: any }>): Promise<Record<string, ValidationResult>> {
    const results: Record<string, ValidationResult> = {}
    
    for (const { field, value } of fields) {
      results[field] = await this.validateField(field, value)
    }
    
    return results
  }
}
