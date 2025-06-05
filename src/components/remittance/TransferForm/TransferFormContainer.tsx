
import { TransferSuccessDialog } from '../TransferSuccessDialog'
import { LoadingState } from './LoadingState'
import { TransferFormCard } from './TransferFormCard'
import { useTransferSubmission } from '../hooks/useTransferSubmission'
import { useTransferFormState } from './hooks/useTransferFormState'
import { useTransferTracking } from './hooks/useTransferTracking'
import { useFormState } from '../hooks/useFormState'
import { useDataLoading } from '../hooks/useDataLoading'
import { useCountryHandling } from '../hooks/useCountryHandling'
import { ValidationProvider } from '../hooks/validation/ValidationContext'

function TransferFormContent() {
  const {
    showSuccessDialog,
    setShowSuccessDialog,
    transferResult,
    setTransferResult,
    handleSuccessDialogClose,
    handleNewTransfer
  } = useTransferFormState()

  const { handleTrackTransfer } = useTransferTracking()
  
  const {
    formData,
    setFormData,
    updateFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    resetForm
  } = useFormState()
  
  const { isDataLoaded } = useDataLoading()
  const { handleCountryChange } = useCountryHandling(updateFormData)

  const { handleSubmit } = useTransferSubmission({
    formData,
    setErrors,
    setTransferResult,
    setShowSuccessDialog,
    setIsSubmitting
  })

  const onTrackTransfer = () => {
    handleTrackTransfer(transferResult, formData, handleSuccessDialogClose)
  }

  const onNewTransfer = () => {
    resetForm() // Reset the form state
    handleNewTransfer() // Close dialog and reset transfer state
  }

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
        onTrackTransfer={onTrackTransfer}
        onNewTransfer={onNewTransfer}
      />
    </>
  )
}

export function TransferFormContainer() {
  return (
    <ValidationProvider>
      <TransferFormContent />
    </ValidationProvider>
  )
}
