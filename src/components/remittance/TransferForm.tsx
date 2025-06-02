
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { TransferSuccessDialog } from './TransferSuccessDialog'
import { TransferFormSteps } from './TransferFormSteps'
import { useTransferForm } from './hooks/useTransferForm'
import { useTransferSubmission } from './hooks/useTransferSubmission'

/**
 * Main transfer form component that handles the multi-step money transfer process
 * @returns JSX element containing the complete transfer form with steps
 */
export function TransferForm() {
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

  // Show loading state until data is loaded
  if (!isDataLoaded) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading transfer form...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Send Money
          </CardTitle>
          <CardDescription>
            Send money quickly and securely to anyone, anywhere
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransferFormSteps
            formData={formData}
            setFormData={setFormData}
            updateFormData={updateFormData}
            onCountryChange={handleCountryChange}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <TransferSuccessDialog
        isOpen={showSuccessDialog}
        onClose={handleSuccessDialogClose}
        formData={formData}
        transferResult={transferResult}
      />
    </>
  )
}
