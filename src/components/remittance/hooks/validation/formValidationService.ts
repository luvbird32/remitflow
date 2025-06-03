
import { TransferFormData } from '../../types'
import { FormValidationResult } from './validationTypes'
import { FieldValidationService } from './fieldValidationService'

/**
 * Form Validation Service
 * 
 * Handles complete form validation
 */
export class FormValidationService {
  /**
   * Validates the entire form and returns comprehensive validation results
   */
  static async validateForm(formData: TransferFormData): Promise<FormValidationResult> {
    const errors: Record<string, string> = {}

    try {
      // Define all fields to validate
      const fieldsToValidate = [
        { field: 'amount', value: formData.amount },
        { field: 'recipientName', value: formData.recipientName },
        { field: 'recipientEmail', value: formData.recipientEmail },
        { field: 'recipientCountry', value: formData.recipientCountry },
        { field: 'deliveryMethod', value: formData.deliveryMethod }
      ]

      // Add delivery-specific fields
      this.addDeliverySpecificFields(formData, fieldsToValidate)

      // Validate all fields
      const validationResults = await FieldValidationService.validateFields(fieldsToValidate)
      
      // Collect errors
      for (const [field, result] of Object.entries(validationResults)) {
        if (!result.isValid && result.error) {
          errors[field] = result.error
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
   * Add delivery method specific fields to validation
   */
  private static addDeliverySpecificFields(
    formData: TransferFormData, 
    fieldsToValidate: Array<{ field: string; value: any }>
  ): void {
    switch (formData.deliveryMethod) {
      case 'bank':
        fieldsToValidate.push(
          { field: 'accountNumber', value: formData.accountNumber },
          { field: 'bankName', value: formData.bankName }
        )
        break
      case 'card':
        fieldsToValidate.push(
          { field: 'cardNumber', value: formData.cardNumber }
        )
        break
      case 'wallet':
        fieldsToValidate.push(
          { field: 'mobileNumber', value: formData.mobileNumber }
        )
        break
    }
  }
}
