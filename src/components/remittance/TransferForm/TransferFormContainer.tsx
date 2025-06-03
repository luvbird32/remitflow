
import { TransferSuccessDialog } from '../TransferSuccessDialog'
import { LoadingState } from './LoadingState'
import { TransferFormCard } from './TransferFormCard'
import { useTransferForm } from '../hooks/useTransferForm'
import { useTransferSubmission } from '../hooks/useTransferSubmission'
import { useToast } from '@/hooks/use-toast'

/**
 * Main transfer form container component that manages the complete money transfer process.
 * 
 * This component orchestrates the multi-step transfer form, handling form state management,
 * validation, submission, and success dialog display. It serves as the main entry point
 * for users to initiate money transfers.
 * 
 * @returns JSX element containing the complete transfer form with loading states and success dialog
 */
export function TransferFormContainer() {
  const { toast } = useToast()
  
  const {
    formData,
    setFormData,
    showSuccessDialog,
    errors,
    setErrors,
    transferResult,
    setTransferResult,
    isDataLoaded,
    handleCountryChange,
    updateFormData,
    handleSuccessDialogClose,
    setShowSuccessDialog
  } = useTransferForm()

  const { handleSubmit, isSubmitting } = useTransferSubmission({
    formData,
    setErrors,
    setTransferResult,
    setShowSuccessDialog
  })

  /**
   * Handles navigation to track transfer section with the transfer ID
   */
  const handleTrackTransfer = () => {
    if (transferResult?.id) {
      console.log('Tracking transfer:', transferResult.id)
      toast({
        title: "Track Transfer",
        description: `Use ID ${transferResult.id} to track your transfer status`,
      })
      
      // Store transfer ID in localStorage for tracking
      const existingTransfers = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      const newTransfer = {
        id: transferResult.id,
        amount: formData.amount,
        currency: formData.fromCurrency,
        recipientName: formData.recipientName,
        recipientCountry: formData.recipientCountry,
        status: transferResult.status,
        createdAt: new Date().toISOString(),
        estimatedDelivery: transferResult.estimatedDelivery
      }
      
      const updatedTransfers = [newTransfer, ...existingTransfers.slice(0, 9)] // Keep last 10
      localStorage.setItem('transferHistory', JSON.stringify(updatedTransfers))
      
      // Close dialog after storing
      handleSuccessDialogClose()
    }
  }

  // Show loading state until required data is loaded
  if (!isDataLoaded) {
    return <LoadingState />
  }

  return (
    <>
      <TransferFormCard
        formData={formData}
        setFormData={setFormData}
        updateFormData={updateFormData}
        onCountryChange={handleCountryChange}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <TransferSuccessDialog
        isOpen={showSuccessDialog}
        onClose={handleSuccessDialogClose}
        formData={formData}
        transferResult={transferResult}
        onTrackTransfer={handleTrackTransfer}
      />
    </>
  )
}
