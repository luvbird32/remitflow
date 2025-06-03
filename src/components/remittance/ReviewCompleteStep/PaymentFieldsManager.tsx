
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'

interface PaymentFieldsManagerProps {
  formData: TransferFormData
  onPaymentFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function usePaymentFieldsManager() {
  const [showPaymentFields, setShowPaymentFields] = useState(false)

  return {
    showPaymentFields,
    setShowPaymentFields
  }
}
