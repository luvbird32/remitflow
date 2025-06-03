
import { TransferFormData } from '../../types'
import { FormValidationResult } from './validationTypes'
import { FieldValidationService } from './fieldValidationService'
import { ApiService } from '@/services/apiService'

/**
 * Form Validation Service
 * 
 * Handles complete form validation including backend validation
 */
export class FormValidationService {
  /**
   * Validates the entire form and returns comprehensive validation results
   */
  static async validateForm(formData: TransferFormData): Promise<FormValidationResult> {
    const errors: Record<string, string> = {}

    try {
      // Validate all basic fields
      const basicFields = [
        { field: 'amount', value: formData.amount },
        { field: 'recipientName', value: formData.recipientName },
        { field: 'recipientEmail', value: formData.recipientEmail },
        { field: 'recipientCountry', value: formData.recipientCountry },
        { field: 'deliveryMethod', value: formData.deliveryMethod }
      ]

      const basicValidations = await FieldValidationService.validateFields(basicFields)
      
      // Collect basic field errors
      for (const [field, result] of Object.entries(basicValidations)) {
        if (!result.isValid && result.error) {
          errors[field] = result.error
        }
      }

      // Validate delivery-specific fields
      await this.validateDeliverySpecificFields(formData, errors)

      // Backend validation
      await this.performBackendValidation(formData, errors)

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
   * Validates delivery method specific fields
   */
  private static async validateDeliverySpecificFields(
    formData: TransferFormData, 
    errors: Record<string, string>
  ): Promise<void> {
    const deliveryFields: Array<{ field: string; value: any }> = []

    if (formData.deliveryMethod === 'bank') {
      deliveryFields.push(
        { field: 'accountNumber', value: formData.accountNumber },
        { field: 'bankName', value: formData.bankName }
      )
    } else if (formData.deliveryMethod === 'card') {
      deliveryFields.push(
        { field: 'cardNumber', value: formData.cardNumber }
      )
    } else if (formData.deliveryMethod === 'wallet') {
      deliveryFields.push(
        { field: 'mobileNumber', value: formData.mobileNumber }
      )
    }

    if (deliveryFields.length > 0) {
      const deliveryValidations = await FieldValidationService.validateFields(deliveryFields)
      
      for (const [field, result] of Object.entries(deliveryValidations)) {
        if (!result.isValid && result.error) {
          errors[field] = result.error
        }
      }
    }
  }

  /**
   * Performs backend validation
   */
  private static async performBackendValidation(
    formData: TransferFormData, 
    errors: Record<string, string>
  ): Promise<void> {
    try {
      await ApiService.validateTransfer(formData)
    } catch (validationError: any) {
      if (validationError.response?.data?.errors) {
        Object.assign(errors, validationError.response.data.errors)
      }
    }
  }
}
