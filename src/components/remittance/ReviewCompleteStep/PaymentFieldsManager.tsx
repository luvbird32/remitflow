
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'

interface PaymentFieldsManagerProps {
  formData: TransferFormData
  onPaymentFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function PaymentFieldsManager({
  formData,
  onPaymentFieldChange,
  errors
}: PaymentFieldsManagerProps) {
  const [showPaymentFields, setShowPaymentFields] = useState(false)

  return {
    showPaymentFields,
    setShowPaymentFields,
    paymentFieldsProps: {
      formData,
      onPaymentFieldChange,
      errors
    }
  }
}
