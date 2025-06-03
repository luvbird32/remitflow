
import { TransferFormData, FormErrors } from '../types'
import { PaymentSectionContainer } from './PaymentSection/PaymentSectionContainer'
import { PaymentSectionContent } from './PaymentSection/PaymentSectionContent'

interface PaymentSectionProps {
  formData: TransferFormData
  showPaymentFields: boolean
  setShowPaymentFields: (show: boolean) => void
  onPaymentFieldChange: (field: string, value: string) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function PaymentSection({
  formData,
  showPaymentFields,
  setShowPaymentFields,
  onPaymentFieldChange,
  isSubmitting,
  errors
}: PaymentSectionProps) {
  return (
    <PaymentSectionContainer>
      <PaymentSectionContent
        formData={formData}
        showPaymentFields={showPaymentFields}
        setShowPaymentFields={setShowPaymentFields}
        onPaymentFieldChange={onPaymentFieldChange}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </PaymentSectionContainer>
  )
}
