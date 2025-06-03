
import { TransferFormData, FormErrors } from '../types'
import { ReviewStepHeader } from './ReviewStepHeader'
import { TransferSummaryCard } from './TransferSummaryCard'
import { SecurityNotice } from './SecurityNotice'
import { PaymentSection } from './PaymentSection'
import { usePaymentFieldsManager } from './PaymentFieldsManager'

interface ReviewCompleteStepProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function ReviewCompleteStep({
  formData,
  setFormData,
  isSubmitting,
  errors
}: ReviewCompleteStepProps) {
  const { showPaymentFields, setShowPaymentFields } = usePaymentFieldsManager()

  const handlePaymentFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ReviewStepHeader />
      <TransferSummaryCard formData={formData} />
      <SecurityNotice />
      <PaymentSection
        formData={formData}
        showPaymentFields={showPaymentFields}
        setShowPaymentFields={setShowPaymentFields}
        onPaymentFieldChange={handlePaymentFieldChange}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </div>
  )
}
