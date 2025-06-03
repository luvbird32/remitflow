
import { ValidationResult } from './types'

/**
 * Individual field validation functions
 */
export const fieldValidators = {
  /**
   * Validates transfer amount according to business rules and limits
   */
  amount: (amount: string): ValidationResult => {
    if (!amount || amount.trim() === '') {
      return { isValid: false, error: 'Please enter an amount' }
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { isValid: false, error: 'Please enter a valid amount' }
    }

    if (numAmount < 1) {
      return { isValid: false, error: 'Minimum amount is $1' }
    }

    if (numAmount > 10000) {
      return { isValid: false, error: 'Maximum amount is $10,000' }
    }

    return { isValid: true }
  },

  /**
   * Validates recipient name for required fields and format
   */
  recipientName: (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
      return { isValid: false, error: 'Please enter the recipient name' }
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' }
    }

    return { isValid: true }
  },

  /**
   * Validates email address format using regex pattern
   */
  recipientEmail: (email: string): ValidationResult => {
    if (email && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' }
      }
    }
    return { isValid: true }
  },

  /**
   * Validates country selection for supported countries
   */
  recipientCountry: (country: string): ValidationResult => {
    if (!country) {
      return { isValid: false, error: 'Please choose where to send money' }
    }
    return { isValid: true }
  },

  /**
   * Validates delivery method based on country support
   */
  deliveryMethod: (method: string): ValidationResult => {
    if (!method) {
      return { isValid: false, error: 'Please choose how they will get the money' }
    }
    return { isValid: true }
  },

  /**
   * Validates bank account number format and length
   */
  accountNumber: (accountNumber: string): ValidationResult => {
    if (!accountNumber || accountNumber.trim() === '') {
      return { isValid: false, error: 'Account number is required' }
    }
    return { isValid: true }
  },

  /**
   * Validates bank name for required field
   */
  bankName: (bankName: string): ValidationResult => {
    if (!bankName || bankName.trim() === '') {
      return { isValid: false, error: 'Bank name is required' }
    }
    return { isValid: true }
  },

  /**
   * Validates card number format and checksum
   */
  cardNumber: (cardNumber: string): ValidationResult => {
    if (!cardNumber || cardNumber.trim() === '') {
      return { isValid: false, error: 'Card number is required' }
    }

    const cleanCardNumber = cardNumber.replace(/\s/g, '')
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      return { isValid: false, error: 'Please enter a valid 16-digit card number' }
    }

    return { isValid: true }
  },

  /**
   * Validates mobile number format for mobile wallet transfers
   */
  mobileNumber: (mobileNumber: string): ValidationResult => {
    if (!mobileNumber || mobileNumber.trim() === '') {
      return { isValid: false, error: 'Mobile number is required' }
    }
    return { isValid: true }
  }
}
