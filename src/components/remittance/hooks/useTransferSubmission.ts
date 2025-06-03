
import { TransferFormData, FormErrors } from '../types'
import { useTransferSubmissionLogic } from './submission/transferSubmissionHook'

/**
 * Transfer Submission Hook Props Interface
 */
interface UseTransferSubmissionProps {
  formData: TransferFormData
  setErrors: (errors: FormErrors) => void
  setTransferResult: (result: any) => void
  setShowSuccessDialog: (show: boolean) => void
}

/**
 * Main Transfer Submission Hook
 * 
 * A simplified hook that manages transfer submission with
 * validation, API calls, and user feedback.
 */
export function useTransferSubmission(props: UseTransferSubmissionProps) {
  return useTransferSubmissionLogic(props)
}
