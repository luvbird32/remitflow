
import { TransferFormData, FormErrors } from '../types'
import { AmountDestinationStepContainer } from './steps/AmountDestinationStepContainer'
import { DeliveryMethodStepContainer } from './steps/DeliveryMethodStepContainer'
import { PaymentDetailsStepContainer } from './steps/PaymentDetailsStepContainer'
import { ReviewStepContainer } from './steps/ReviewStepContainer'

interface TransferFormStepsProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  updateFormData: (updates: Partial<TransferFormData>) => void
  onCountryChange: (countryCode: string) => void
  errors: FormErrors
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function TransferFormSteps({
  formData,
  setFormData,
  updateFormData,
  onCountryChange,
  errors,
  isSubmitting,
  onSubmit
}: TransferFormStepsProps) {
  const hasBasicInfo = !!(formData.amount && formData.recipientName && formData.recipientCountry)
  const hasDeliveryMethod = hasBasicInfo && !!formData.deliveryMethod
  const showPaymentDetails = hasDeliveryMethod
  const showReviewStep = hasDeliveryMethod

  console.log('TransferFormSteps: Rendering with form data:', formData)
  console.log('TransferFormSteps: hasBasicInfo:', hasBasicInfo, 'hasDeliveryMethod:', hasDeliveryMethod)

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <AmountDestinationStepContainer
        formData={formData}
        updateFormData={updateFormData}
        onCountryChange={onCountryChange}
        errors={errors}
      />

      {hasBasicInfo && (
        <DeliveryMethodStepContainer
          recipientCountry={formData.recipientCountry}
          deliveryMethod={formData.deliveryMethod}
          setDeliveryMethod={(method) => updateFormData({ deliveryMethod: method })}
          errors={errors}
        />
      )}

      {showPaymentDetails && (
        <PaymentDetailsStepContainer
          formData={formData}
          onFieldChange={(field, value) => updateFormData({ [field]: value })}
          errors={errors}
        />
      )}

      {showReviewStep && (
        <ReviewStepContainer
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      )}

      {errors.general && (
        <div className="text-red-500 text-sm text-center">
          {errors.general}
        </div>
      )}
    </form>
  )
}
