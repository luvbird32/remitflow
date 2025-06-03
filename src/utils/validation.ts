
import { getSecurityConfig } from '@/config/security'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export class SecurityValidator {
  private static config = getSecurityConfig()

  static validateTransferAmount(amount: string): ValidationResult {
    const errors: string[] = []
    const numAmount = parseFloat(amount)

    if (!this.config.enableInputValidation) {
      return { isValid: true, errors: [] }
    }

    if (isNaN(numAmount) || numAmount <= 0) {
      errors.push('Amount must be a valid positive number')
    }

    if (numAmount > this.config.maxTransferAmount) {
      errors.push(`Amount cannot exceed ${this.config.maxTransferAmount}`)
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static sanitizeInput(input: string): string {
    if (!this.config.enableInputValidation) {
      return input
    }

    // Basic sanitization - remove potentially harmful characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>'"]/g, '')
      .trim()
  }

  static validateEmail(email: string): ValidationResult {
    const errors: string[] = []
    
    if (!this.config.enableInputValidation) {
      return { isValid: true, errors: [] }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}
