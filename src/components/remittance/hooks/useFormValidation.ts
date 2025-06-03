
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { ApiService } from '@/services/apiService'

/**
 * Form Validation Hook
 * 
 * A custom React hook that provides comprehensive form validation functionality
 * for the remittance transfer form. This hook validates all form fields according
 * to business rules and regulatory requirements.
 * 
 * Features:
 * - Real-time field validation
 * - Cross-field validation (e.g., amount limits based on country)
 * - Backend validation integration
 * - Error state management
 * - Async validation for complex rules
 * 
 * @returns Object containing validation functions and error state
 * 
 * @example
 * ```typescript
 * const { validateForm, validateField, errors, isValidating } = useFormValidation();
 * 
 * // Validate entire form
 * const { isValid, errors } = await validateForm(formData);
 * 
 * // Validate single field
 * const isFieldValid = await validateField('amount', '100');
 * ```
 */
export function useFormValidation() {
  const [isValidating, setIsValidating] = useState(false)

  /**
   * Validates a single form field according to its specific rules
   * 
   * @param field - The name of the field to validate
   * @param value - The current value of the field
   * @param formData - Complete form data for cross-field validation
   * @returns Promise resolving to validation result with any errors
   */
  const validateField = async (field: string, value: any, formData?: TransferFormData): Promise<{ isValid: boolean; error?: string }> => {
    try {
      switch (field) {
        case 'amount':
          return validateAmount(value)
        case 'recipientName':
          return validateRecipientName(value)
        case 'recipientEmail':
          return validateEmail(value)
        case 'recipientCountry':
          return validateCountry(value)
        case 'deliveryMethod':
          return validateDeliveryMethod(value, formData?.recipientCountry)
        case 'accountNumber':
          return validateAccountNumber(value)
        case 'bankName':
          return validateBankName(value)
        case 'cardNumber':
          return validateCardNumber(value)
        case 'mobileNumber':
          return validateMobileNumber(value)
        default:
          return { isValid: true }
      }
    } catch (error) {
      console.error('Field validation error:', error)
      return { isValid: false, error: 'Validation failed' }
    }
  }

  /**
   * Validates the entire form and returns comprehensive validation results
   * 
   * @param formData - Complete form data to validate
   * @returns Promise resolving to validation result with all errors
   */
  const validateForm = async (formData: TransferFormData): Promise<{ isValid: boolean; errors: FormErrors }> => {
    setIsValidating(true)
    const errors: FormErrors = {}

    try {
      // Validate amount
      const amountResult = await validateField('amount', formData.amount, formData)
      if (!amountResult.isValid) {
        errors.amount = amountResult.error
      }

      // Validate recipient information
      const recipientNameResult = await validateField('recipientName', formData.recipientName, formData)
      if (!recipientNameResult.isValid) {
        errors.recipientName = recipientNameResult.error
      }

      const recipientEmailResult = await validateField('recipientEmail', formData.recipientEmail, formData)
      if (!recipientEmailResult.isValid) {
        errors.recipientEmail = recipientEmailResult.error
      }

      const recipientCountryResult = await validateField('recipientCountry', formData.recipientCountry, formData)
      if (!recipientCountryResult.isValid) {
        errors.recipientCountry = recipientCountryResult.error
      }

      // Validate delivery method
      const deliveryMethodResult = await validateField('deliveryMethod', formData.deliveryMethod, formData)
      if (!deliveryMethodResult.isValid) {
        errors.deliveryMethod = deliveryMethodResult.error
      }

      // Validate delivery-specific fields
      if (formData.deliveryMethod === 'bank') {
        const accountNumberResult = await validateField('accountNumber', formData.accountNumber, formData)
        if (!accountNumberResult.isValid) {
          errors.accountNumber = accountNumberResult.error
        }

        const bankNameResult = await validateField('bankName', formData.bankName, formData)
        if (!bankNameResult.isValid) {
          errors.bankName = bankNameResult.error
        }
      } else if (formData.deliveryMethod === 'card') {
        const cardNumberResult = await validateField('cardNumber', formData.cardNumber, formData)
        if (!cardNumberResult.isValid) {
          errors.cardNumber = cardNumberResult.error
        }
      } else if (formData.deliveryMethod === 'wallet') {
        const mobileNumberResult = await validateField('mobileNumber', formData.mobileNumber, formData)
        if (!mobileNumberResult.isValid) {
          errors.mobileNumber = mobileNumberResult.error
        }
      }

      // Use backend validation for additional checks
      try {
        await ApiService.validateTransfer(formData)
      } catch (validationError: any) {
        if (validationError.response?.data?.errors) {
          Object.assign(errors, validationError.response.data.errors)
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
        errors: { general: 'Validation failed. Please try again.' }
      }
    } finally {
      setIsValidating(false)
    }
  }

  // Individual field validation functions

  /**
   * Validates transfer amount according to business rules and limits
   */
  const validateAmount = (amount: string): { isValid: boolean; error?: string } => {
    if (!amount || amount.trim() === '') {
      return { isValid: false, error: 'Amount is required' }
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { isValid: false, error: 'Please enter a valid amount' }
    }

    if (numAmount < 1) {
      return { isValid: false, error: 'Minimum transfer amount is $1' }
    }

    if (numAmount > 10000) {
      return { isValid: false, error: 'Maximum transfer amount is $10,000' }
    }

    return { isValid: true }
  }

  /**
   * Validates recipient name for required fields and format
   */
  const validateRecipientName = (name: string): { isValid: boolean; error?: string } => {
    if (!name || name.trim() === '') {
      return { isValid: false, error: 'Recipient name is required' }
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' }
    }

    return { isValid: true }
  }

  /**
   * Validates email address format using regex pattern
   */
  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' }
      }
    }
    return { isValid: true }
  }

  /**
   * Validates country selection for supported countries
   */
  const validateCountry = (country: string): { isValid: boolean; error?: string } => {
    if (!country) {
      return { isValid: false, error: 'Please select recipient country' }
    }
    return { isValid: true }
  }

  /**
   * Validates delivery method based on country support
   */
  const validateDeliveryMethod = (method: string, country?: string): { isValid: boolean; error?: string } => {
    if (!method) {
      return { isValid: false, error: 'Please select delivery method' }
    }
    return { isValid: true }
  }

  /**
   * Validates bank account number format and length
   */
  const validateAccountNumber = (accountNumber: string): { isValid: boolean; error?: string } => {
    if (!accountNumber || accountNumber.trim() === '') {
      return { isValid: false, error: 'Account number is required' }
    }
    return { isValid: true }
  }

  /**
   * Validates bank name for required field
   */
  const validateBankName = (bankName: string): { isValid: boolean; error?: string } => {
    if (!bankName || bankName.trim() === '') {
      return { isValid: false, error: 'Bank name is required' }
    }
    return { isValid: true }
  }

  /**
   * Validates card number format and checksum
   */
  const validateCardNumber = (cardNumber: string): { isValid: boolean; error?: string } => {
    if (!cardNumber || cardNumber.trim() === '') {
      return { isValid: false, error: 'Card number is required' }
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '')
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      return { isValid: false, error: 'Please enter a valid 16-digit card number' }
    }

    return { isValid: true }
  }

  /**
   * Validates mobile number format for mobile wallet transfers
   */
  const validateMobileNumber = (mobileNumber: string): { isValid: boolean; error?: string } => {
    if (!mobileNumber || mobileNumber.trim() === '') {
      return { isValid: false, error: 'Mobile number is required' }
    }
    return { isValid: true }
  }

  return {
    validateForm,
    validateField,
    isValidating
  }
}
