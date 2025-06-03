
import { useState } from "react"
import { TransferFormData } from '../types'
import { CrashReporter } from '@/utils/crashReporter'

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

export function useFormData() {
  const [formData, setFormData] = useState<TransferFormData>(initialFormData)

  const updateFormData = (updates: Partial<TransferFormData>) => {
    try {
      setFormData(prev => ({ ...prev, ...updates }))
    } catch (error) {
      CrashReporter.report('component_error', error as Error, 'Updating form data')
      console.error('Error updating form data:', error)
    }
  }

  const resetFormData = () => {
    try {
      setFormData(initialFormData)
    } catch (error) {
      CrashReporter.report('component_error', error as Error, 'Resetting form data')
      console.error('Error resetting form data:', error)
    }
  }

  const validateFormData = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          return !!(formData.amount && formData.recipientName && formData.recipientCountry)
        case 2:
          return !!formData.deliveryMethod
        case 3:
          return true // Additional validation can be added here
        default:
          return false
      }
    } catch (error) {
      CrashReporter.report('validation_error', error as Error, `Validating form data step ${step}`)
      return false
    }
  }

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
    validateFormData
  }
}
