
import { TransferSuccessDialog } from '../TransferSuccessDialog'
import { LoadingState } from './LoadingState'
import { TransferFormCard } from './TransferFormCard'
import { useTransferSubmission } from '../hooks/useTransferSubmission'
import { useTransferFormState } from './hooks/useTransferFormState'
import { useTransferTracking } from './hooks/useTransferTracking'
import { useFormData } from '../hooks/useFormData'
import { useDataLoading } from '../hooks/useDataLoading'
import { useCountryHandling } from '../hooks/useCountryHandling'

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
  
  const { formData, setFormData, updateFormData, resetFormData } = useFormData()
  const { isDataLoaded } = useDataLoading()
  const { handleCountryChange } = useCountryHandling(updateFormData)

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

  try {
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
  } catch (error) {
    console.error('TransferFormContainer error:', error)
    return (
      <div className="modern-card p-6 text-center">
        <p className="text-red-600">Something went wrong with the transfer form. Please refresh the page.</p>
      </div>
    )
  }
}
