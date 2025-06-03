
import { TransferFormData } from '../../types'
import { FormValidationResult } from './validationTypes'
import { FieldValidationService } from './fieldValidationService'
import { DeliveryValidationService } from './deliveryValidationService'

export class FormValidationService {
  static async validateForm(formData: TransferFormData): Promise<FormValidationResult> {
    const errors: Record<string, string> = {}

    try {
      const coreFields = [
        { field: 'amount', value: formData.amount },
        { field: 'recipientName', value: formData.recipientName },
        { field: 'recipientEmail', value: formData.recipientEmail },
        { field: 'recipientCountry', value: formData.recipientCountry },
        { field: 'deliveryMethod', value: formData.deliveryMethod }
      ]

      const validationResults = await FieldValidationService.validateFields(coreFields)
      
      for (const [field, result] of Object.entries(validationResults)) {
        if (!result.isValid && result.error) {
          errors[field] = result.error
        }
      }

      // Validate delivery-specific fields
      if (formData.deliveryMethod) {
        const deliveryResults = DeliveryValidationService.validateDeliveryFields(formData.deliveryMethod, formData)
        for (const [field, result] of Object.entries(deliveryResults)) {
          if (!result.isValid && result.error) {
            errors[field] = result.error
          }
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
}
