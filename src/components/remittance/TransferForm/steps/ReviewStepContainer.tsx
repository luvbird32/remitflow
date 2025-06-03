
import { ReviewCompleteStep } from '../../ReviewCompleteStep'
import { TransferFormData, FormErrors } from '../../types'
import { FormStep } from '../FormStep'

interface ReviewStepContainerProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function ReviewStepContainer({
  formData,
  setFormData,
  isSubmitting,
  errors
}: ReviewStepContainerProps) {
  return (
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
  )
}
