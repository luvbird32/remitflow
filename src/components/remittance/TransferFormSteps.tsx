
import { TransferFormSteps as TransferFormStepsComponent } from './TransferForm/TransferFormSteps'
import { TransferFormData, FormErrors } from './types'

/**
 * Props interface for the TransferFormSteps component
 */
interface TransferFormStepsProps {
  /** Current form data containing all transfer information */
  formData: TransferFormData
  /** Function to update the complete form data */
  setFormData: (data: TransferFormData) => void
  /** Function to update partial form data */
  updateFormData: (updates: Partial<TransferFormData>) => void
  /** Callback when recipient country changes */
  onCountryChange: (countryCode: string) => void
  /** Current form validation errors */
  errors: FormErrors
  /** Whether the form is currently being submitted */
  isSubmitting: boolean
  /** Form submission handler */
  onSubmit: (e: React.FormEvent) => void
}

/**
 * Transfer form steps wrapper component.
 * 
 * This component serves as a wrapper that delegates to the actual
 * TransferFormSteps implementation for better code organization.
 * 
 * @param props - Component props containing form data and handlers
 * @returns JSX element with the multi-step form structure
 */
export function TransferFormSteps(props: TransferFormStepsProps) {
  return <TransferFormStepsComponent {...props} />
}
