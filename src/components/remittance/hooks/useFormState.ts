
import { useState, useCallback } from 'react'
import { TransferFormData, FormErrors } from '../types'

const initialFormData: TransferFormData = {
  amount: "",
  recipientName: "",
  recipientEmail: "",
  recipientCountry: "",
  deliveryMethod: "",
  fromCurrency: "USD",
  toCurrency: "EUR",
  accountNumber: "",
  bankName: "",
  cardNumber: "",
  cardIssuer: "",
  mobileNumber: "",
  mobileProvider: ""
}

export function useFormState() {
  const [formData, setFormData] = useState<TransferFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = useCallback((updates: Partial<TransferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const addError = useCallback((field: keyof FormErrors, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }, [])

  const removeError = useCallback((field: keyof FormErrors) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
  }, [])

  return {
    formData,
    setFormData,
    updateFormData,
    errors,
    setErrors,
    clearErrors,
    addError,
    removeError,
    isSubmitting,
    setIsSubmitting,
    resetForm
  }
}
