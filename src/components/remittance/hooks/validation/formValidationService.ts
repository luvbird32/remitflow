
import { TransferFormData } from '../../types'
import { FormValidationResult } from './validationTypes'
import { FieldValidationService } from './fieldValidationService'

export class FormValidationService {
  static async validateForm(formData: TransferFormData): Promise<FormValidationResult> {
    const errors: Record<string, string> = {}

    try {
      const fieldsToValidate = [
        { field: 'amount', value: formData.amount },
        { field: 'recipientName', value: formData.recipientName },
        { field: 'recipientEmail', value: formData.recipientEmail },
        { field: 'recipientCountry', value: formData.recipientCountry },
        { field: 'deliveryMethod', value: formData.deliveryMethod }
      ]

      this.addDeliverySpecificFields(formData, fieldsToValidate)

      const validationResults = await FieldValidationService.validateFields(fieldsToValidate)
      
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
