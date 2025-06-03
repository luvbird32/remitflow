
import { TransferSuccessDialog } from '../TransferSuccessDialog'
import { LoadingState } from './LoadingState'
import { TransferFormCard } from './TransferFormCard'
import { useTransferForm } from '../hooks/useTransferForm'
import { useTransferSubmission } from '../hooks/useTransferSubmission'

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
   * Handles navigation to track transfer section
   */
  const handleTrackTransfer = () => {
    console.log('Navigating to track transfer section for transfer:', transferResult?.id)
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
