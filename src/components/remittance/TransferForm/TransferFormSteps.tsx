
import { DeliveryMethodStep } from '../DeliveryMethodStep'
import { ReviewCompleteStep } from '../ReviewCompleteStep'
import { PaymentMethodFields } from '../PaymentMethodFields'
import { TransferFormData, FormErrors } from '../types'
import { FormStep } from './FormStep'
import { AmountDestinationStepContainer } from './steps/AmountDestinationStepContainer'

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

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <AmountDestinationStepContainer
        formData={formData}
        updateFormData={updateFormData}
        onCountryChange={onCountryChange}
        errors={errors}
      />

      {hasBasicInfo && (
        <FormStep
          stepNumber={2}
          title="Delivery Method"
          description="Choose how the recipient will receive the money"
          showArrow
          isVisible={true}
        >
          <DeliveryMethodStep
            recipientCountry={formData.recipientCountry}
            deliveryMethod={formData.deliveryMethod}
            setDeliveryMethod={(method) => updateFormData({ deliveryMethod: method })}
            errors={errors}
          />
        </FormStep>
      )}

      {showPaymentDetails && (
        <FormStep
          stepNumber={3}
          title="Payment Details"
          description="Enter your payment information"
          showArrow
          isVisible={true}
        >
          <PaymentMethodFields
            formData={formData}
            onFieldChange={(field, value) => updateFormData({ [field]: value })}
            errors={errors}
          />
        </FormStep>
      )}

      {showReviewStep && (
        <FormStep
          stepNumber={4}
          title="Review & Complete Transfer"
          description="Verify all details and complete your transfer"
          showArrow
          isHighlighted
          isVisible={true}
        >
          <ReviewCompleteStep
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        </FormStep>
      )}

      {errors.general && (
        <div className="text-red-500 text-sm text-center">
          {errors.general}
        </div>
      )}
    </form>
  )
}
