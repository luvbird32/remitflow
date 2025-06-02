
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { ReviewStepHeader } from './ReviewStepHeader'
import { TransferSummaryCard } from './TransferSummaryCard'
import { SecurityNotice } from './SecurityNotice'
import { PaymentSection } from './PaymentSection'

/**
 * Props interface for the ReviewCompleteStep component
 */
interface ReviewCompleteStepProps {
  /** Current transfer form data */
  formData: TransferFormData
  /** Function to update form data */
  setFormData: (data: TransferFormData) => void
  /** Whether the form is currently being submitted */
  isSubmitting: boolean
  /** Current form validation errors */
  errors: FormErrors
}

/**
 * Final step of the transfer form where users review their transfer details
 * and complete the payment process.
 * 
 * This component handles the review and payment flow, including:
 * - Display of transfer summary
 * - Security information
 * - Payment method selection and details entry
 * - Final submission
 * 
 * @param props - Component props containing form data and handlers
 * @returns JSX element with the review and payment interface
 */
export function ReviewCompleteStep({
  formData,
  setFormData,
  isSubmitting,
  errors
}: ReviewCompleteStepProps) {
  const [showPaymentFields, setShowPaymentFields] = useState(false)

  /**
   * Handles changes to payment-related form fields
   * @param field - The field name to update
   * @param value - The new field value
   */
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
