
import { TransferSuccessDialog } from '../TransferSuccessDialog'
import { LoadingState } from './LoadingState'
import { TransferFormCard } from './TransferFormCard'
import { useTransferForm } from '../hooks/useTransferForm'
import { useTransferSubmission } from '../hooks/useTransferSubmission'
import { useTransferFormState } from './hooks/useTransferFormState'
import { useTransferTracking } from './hooks/useTransferTracking'

export function TransferFormContainer() {
  const {
    showSuccessDialog,
    setShowSuccessDialog,
    transferResult,
    setTransferResult,
    errors,
    setErrors,
    handleSuccessDialogClose
  } = useTransferFormState()

  const { handleTrackTransfer } = useTransferTracking()
  
  const {
    formData,
    setFormData,
    isDataLoaded,
    handleCountryChange,
    updateFormData
  } = useTransferForm()

  const { handleSubmit, isSubmitting } = useTransferSubmission({
    formData,
    setErrors,
    setTransferResult,
    setShowSuccessDialog
  })

  const onTrackTransfer = () => {
    handleTrackTransfer(transferResult, formData, handleSuccessDialogClose)
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
      />
    </>
  )
}
