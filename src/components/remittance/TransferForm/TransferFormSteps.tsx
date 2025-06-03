
import { TransferFormData, FormErrors } from '../types'
import { AmountDestinationStepContainer } from './steps/AmountDestinationStepContainer'
import { DeliveryMethodStepContainer } from './steps/DeliveryMethodStepContainer'
import { PaymentDetailsStepContainer } from './steps/PaymentDetailsStepContainer'
import { ReviewStepContainer } from './steps/ReviewStepContainer'
import { FormLayout } from './FormLayout'
import { FormErrorDisplay } from './FormErrorDisplay'
import { useStepVisibility } from './StepVisibilityManager'

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
  const { hasBasicInfo, showPaymentDetails, showReviewStep } = useStepVisibility({ formData })

  console.log('TransferFormSteps: Rendering with form data:', formData)
  console.log('TransferFormSteps: hasBasicInfo:', hasBasicInfo, 'showPaymentDetails:', showPaymentDetails)

  return (
    <FormLayout onSubmit={onSubmit}>
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

      <FormErrorDisplay errors={errors} />
    </FormLayout>
  )
}
