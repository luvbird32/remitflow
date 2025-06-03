
import { TransferFormData } from '../types'

interface StepVisibilityManagerProps {
  formData: TransferFormData
}

export function useStepVisibility({ formData }: StepVisibilityManagerProps) {
  const hasBasicInfo = !!(formData.amount && formData.recipientName && formData.recipientCountry)
  const hasDeliveryMethod = hasBasicInfo && !!formData.deliveryMethod
  const showPaymentDetails = hasDeliveryMethod
  const showReviewStep = hasDeliveryMethod

  return {
    hasBasicInfo,
    hasDeliveryMethod,
    showPaymentDetails,
    showReviewStep
  }
}
