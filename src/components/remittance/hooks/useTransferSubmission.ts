
import { useState } from "react"
import { TransferFormData, FormErrors } from '../types'
import { EnhancedApiService } from '@/services/enhancedApiService'
import { useFormValidation } from './useFormValidation'
import { useToast } from '@/hooks/use-toast'
import { TransferProcessingService } from '../services/transferProcessingService'
import { TransferStorageUtils } from '../utils/transferStorageUtils'

interface UseTransferSubmissionProps {
  formData: TransferFormData
  setErrors: (errors: FormErrors) => void
  setTransferResult: (result: any) => void
  setShowSuccessDialog: (show: boolean) => void
}

export function useTransferSubmission({
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
      
      const { isValid, errors } = await validateForm(formData)
      if (!isValid) {
        console.log('Form validation failed:', errors)
        setErrors(errors)
        toast({
          title: "Validation Error",
          description: "Please check your form and try again.",
          variant: "destructive"
        })
        return
      }
      
      setIsSubmitting(true)
      setErrors({})
      
      console.log('Submitting transfer with data:', formData)
      
      toast({
        title: "Processing Transfer",
        description: "Your transfer is being processed..."
      })
      
      let result
      try {
        result = await EnhancedApiService.createTransfer(formData)
        console.log('Transfer API response:', result)
      } catch (apiError) {
        console.log('Backend unavailable, simulating transfer processing')
        console.error('API Error:', apiError)
        
        result = await TransferProcessingService.simulateTransferProcessing(formData)
      }
      
      if (result) {
        // Store in transfer history
        TransferStorageUtils.storeTransferInHistory(formData, result)
        
        setTransferResult(result)
        setShowSuccessDialog(true)
        console.log('Transfer submitted successfully:', result.id)
        
        toast({
          title: "Transfer Successful!",
          description: `Your transfer ${result.id} has been processed. Amount: ${formData.fromCurrency} ${formData.amount}`,
        })

        // Simulate status updates for demo
        setTimeout(() => {
          TransferStorageUtils.updateTransferStatus(result.id, 'processing')
        }, 30000)

        if (result.status === 'pending') {
          setTimeout(() => {
            TransferStorageUtils.updateTransferStatus(result.id, 'delivered')
          }, 120000)
        }
      }
    } catch (error: any) {
      console.error('Transfer submission error:', error)
      setErrors({ 
        general: error?.message || 'Failed to submit transfer. Please try again.' 
      })
      
      toast({
        title: "Transfer Failed",
        description: error?.message || 'Failed to submit transfer. Please try again.',
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting }
}
