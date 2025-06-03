
import { useState } from "react"
import { TransferFormData } from '../types'

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
      console.error('Error updating form data:', error)
    }
  }

  const resetFormData = () => {
    try {
      setFormData(initialFormData)
    } catch (error) {
      console.error('Error resetting form data:', error)
    }
  }

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData
  }
}
