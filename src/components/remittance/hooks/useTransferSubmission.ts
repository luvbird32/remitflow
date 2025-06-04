
import { useCallback } from 'react'
import { TransferFormData, FormErrors } from '../types'
import { TransferSubmissionService } from './submission/transferSubmissionService'
import { useValidation } from './validation/ValidationContext'

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
  const { validateForm } = useValidation()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('useTransferSubmission: Starting submission process')
    console.log('useTransferSubmission: Form data:', formData)
    
    setIsSubmitting(true)
    setErrors({})

    try {
      // For saved card selections, we may not need full validation
      const hasValidPaymentMethod = formData.paymentCardNumber || formData.paymentName
      
      if (!hasValidPaymentMethod) {
        console.log('useTransferSubmission: No payment method selected')
        setErrors({ general: 'Please select a payment method to continue.' })
        return
      }

      console.log('useTransferSubmission: Payment method validated, proceeding with submission')
      
      // Validate form first
      console.log('useTransferSubmission: Validating form...')
      const validation = await validateForm(formData)
      
      if (!validation.isValid) {
        console.log('useTransferSubmission: Form validation failed:', validation.errors)
        setErrors(validation.errors as FormErrors)
        return
      }

      console.log('useTransferSubmission: Form validation passed, submitting transfer...')
      
      // Submit transfer
      const result = await TransferSubmissionService.submitTransfer(formData)
      
      if (result) {
        console.log('useTransferSubmission: Transfer submission successful:', result)
        setTransferResult(result)
        setShowSuccessDialog(true)
      } else {
        console.error('useTransferSubmission: Transfer submission returned null/undefined result')
        setErrors({ general: 'Transfer submission failed. Please try again.' })
      }
    } catch (error) {
      console.error('useTransferSubmission: Transfer submission error:', error)
      setErrors({ 
        general: error instanceof Error ? error.message : 'Failed to submit transfer. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
      console.log('useTransferSubmission: Submission process completed')
    }
  }, [formData, validateForm, setErrors, setTransferResult, setShowSuccessDialog, setIsSubmitting])

  return { handleSubmit }
}
