
import { AmountDestinationStep } from '../AmountDestinationStep'
import { DeliveryMethodStep } from '../DeliveryMethodStep'
import { ReviewCompleteStep } from '../ReviewCompleteStep'
import { PaymentMethodFields } from '../PaymentMethodFields'
import { TransferFormData, FormErrors } from '../types'
import { FormStep } from './FormStep'
import { useStepNavigation } from './StepNavigation'

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
  const { showStep2, showStep3, showStep4 } = useStepNavigation({ formData })

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <FormStep
        stepNumber={1}
        title="Amount & Destination"
        description="Enter transfer amount and recipient details"
      >
        <AmountDestinationStep
          amount={formData.amount}
          setAmount={(amount) => updateFormData({ amount })}
          recipientName={formData.recipientName}
          setRecipientName={(name) => updateFormData({ recipientName: name })}
          recipientCountry={formData.recipientCountry}
          onCountryChange={onCountryChange}
          fromCurrency={formData.fromCurrency}
          setFromCurrency={(currency) => updateFormData({ fromCurrency: currency })}
          errors={errors}
        />
      </FormStep>

      <FormStep
        stepNumber={2}
        title="Delivery Method"
        description="Choose how the recipient will receive the money"
        showArrow
        isVisible={showStep2}
      >
        <DeliveryMethodStep
          recipientCountry={formData.recipientCountry}
          deliveryMethod={formData.deliveryMethod}
          setDeliveryMethod={(method) => updateFormData({ deliveryMethod: method })}
          errors={errors}
        />
      </FormStep>

      <FormStep
        stepNumber={3}
        title="Payment Details"
        description="Enter your payment information"
        showArrow
        isVisible={showStep3}
      >
        <PaymentMethodFields
          formData={formData}
          onFieldChange={(field, value) => updateFormData({ [field]: value })}
          errors={errors}
        />
      </FormStep>

      <FormStep
        stepNumber={4}
        title="Review & Complete Transfer"
        description="Verify all details and complete your transfer"
        showArrow
        isHighlighted
        isVisible={showStep4}
      >
        <ReviewCompleteStep
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </FormStep>

      {errors.general && (
        <div className="text-red-500 text-sm text-center">
          {errors.general}
        </div>
      )}
    </form>
  )
}
