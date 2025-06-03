
import { useState, useCallback } from 'react'
import { FormErrors } from '../types'
import { useErrorHandler } from '@/hooks/useErrorHandler'

export function useFormErrorHandling() {
  const [errors, setErrors] = useState<FormErrors>({})
  const { handleError } = useErrorHandler()

  const addError = useCallback((field: keyof FormErrors, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }))
  }, [])

  const removeError = useCallback((field: keyof FormErrors) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const handleFormError = useCallback((error: Error | string, context?: string) => {
    handleError(error, context)
    setErrors(prev => ({
      ...prev,
      general: typeof error === 'string' ? error : error.message
    }))
  }, [handleError])

  const validateField = useCallback((field: keyof FormErrors, value: string, rules?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => string | null
  }) => {
    if (!rules) return

    if (rules.required && !value.trim()) {
      addError(field, `${field} is required`)
      return false
    }

    if (rules.minLength && value.length < rules.minLength) {
      addError(field, `${field} must be at least ${rules.minLength} characters`)
      return false
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      addError(field, `${field} must be no more than ${rules.maxLength} characters`)
      return false
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      addError(field, `${field} format is invalid`)
      return false
    }

    if (rules.custom) {
      const customError = rules.custom(value)
      if (customError) {
        addError(field, customError)
        return false
      }
    }

    removeError(field)
    return true
  }, [addError, removeError])

  return {
    errors,
    addError,
    removeError,
    clearErrors,
    handleFormError,
    validateField,
    hasErrors: Object.keys(errors).length > 0
  }
}
