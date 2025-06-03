
import { useCallback } from 'react'
import { TransferFormData, FormErrors } from '../types'
import { TransferSubmissionService } from './submission/transferSubmissionService'
import { useFormValidation } from './useFormValidation'

interface UseTransferSubmissionProps {
  formData: TransferFormData
  setErrors: (errors: FormErrors) => void
  setTransferResult: (result: any) => void
  setShowSuccessDialog: (show: boolean) => void
  setIsSubmitting: (submitting: boolean) => void
}

export function useTransferSubmission({
  formData,
  setErrors,
  setTransferResult,
  setShowSuccessDialog,
  setIsSubmitting
}: UseTransferSubmissionProps) {
  const { validateForm } = useFormValidation()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form first
      const validation = await validateForm(formData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        return
      }

      // Submit transfer
      const result = await TransferSubmissionService.submitTransfer(formData)
      
      if (result) {
        setTransferResult(result)
        setShowSuccessDialog(true)
      }
    } catch (error) {
      console.error('Transfer submission error:', error)
      setErrors({ general: 'Failed to submit transfer. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, setErrors, setTransferResult, setShowSuccessDialog, setIsSubmitting])

  return { handleSubmit }
}
