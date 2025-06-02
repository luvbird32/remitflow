
import { ReviewCompleteStep as ReviewCompleteStepComponent } from './ReviewCompleteStep/ReviewCompleteStep'
import { TransferFormData, FormErrors } from './types'

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
 * Review and complete step wrapper component.
 * 
 * This component serves as a wrapper that delegates to the actual
 * ReviewCompleteStep implementation for better code organization.
 * 
 * @param props - Component props containing form data and handlers
 * @returns JSX element with the review and payment interface
 */
export function ReviewCompleteStep(props: ReviewCompleteStepProps) {
  return <ReviewCompleteStepComponent {...props} />
}
