
import { useState } from "react"
import { TransferFormData, FormErrors } from '../../types'
import { useFormValidation } from '../useFormValidation'
import { useToast } from '@/hooks/use-toast'
import { TransferSubmissionService } from './transferSubmissionService'

interface UseTransferSubmissionProps {
  formData: TransferFormData
  setErrors: (errors: FormErrors) => void
  setTransferResult: (result: any) => void
  setShowSuccessDialog: (show: boolean) => void
}

/**
 * Simplified Transfer Submission Hook
 */
export function useTransferSubmissionLogic({
  formData,
  setErrors,
  setTransferResult,
  setShowSuccessDialog
}: UseTransferSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { validateForm } = useFormValidation()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      console.log('Starting transfer submission...')
      
      // Validate form
      const { isValid, errors } = await validateForm(formData)
      if (!isValid) {
        console.log('Form validation failed:', errors)
        setErrors(errors)
        toast({
          title: "Please check your information",
          description: "Some fields need your attention.",
          variant: "destructive"
        })
        return
      }
      
      // Set loading state and clear previous errors
      setIsSubmitting(true)
      setErrors({})
      
      // Provide immediate user feedback
      toast({
        title: "Processing your transfer",
        description: "This will just take a moment..."
      })
      
      // Submit transfer
      const result = await TransferSubmissionService.submitTransfer(formData)
      
      if (result) {
        // Update UI state with success
        setTransferResult(result)
        setShowSuccessDialog(true)
        console.log('Transfer submitted successfully:', result.id)
        
        // Display success notification
        toast({
          title: "Money sent successfully!",
          description: `Reference number: ${result.id}. Amount: ${formData.fromCurrency} ${formData.amount}`,
        })
      }
    } catch (error: any) {
      console.error('Transfer submission error:', error)
      setErrors({ 
        general: error?.message || 'Something went wrong. Please try again.' 
      })
      
      toast({
        title: "Unable to send money",
        description: error?.message || 'Please try again in a moment.',
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting }
}
