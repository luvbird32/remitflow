
import { PaymentMethodFields } from '../../PaymentMethodFields'
import { TransferFormData, FormErrors } from '../../types'
import { FormStep } from '../FormStep'

interface PaymentDetailsStepContainerProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function PaymentDetailsStepContainer({
  formData,
  onFieldChange,
  errors
}: PaymentDetailsStepContainerProps) {
  return (
    <FormStep
      stepNumber={3}
      title="Payment Details"
      description="Enter your payment information"
      showArrow
      isVisible={true}
    >
      <PaymentMethodFields
        formData={formData}
        onFieldChange={(field, value) => {
          console.log('PaymentDetailsStepContainer: Setting field', field, 'to:', value)
          onFieldChange(field, value)
        }}
        errors={errors}
      />
    </FormStep>
  )
}
