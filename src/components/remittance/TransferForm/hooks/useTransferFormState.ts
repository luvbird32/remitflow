
import { useState } from "react"
import { TransferFormData, FormErrors } from '../../types'

export function useTransferFormState() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [transferResult, setTransferResult] = useState<any>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSuccessDialogClose = () => {
    console.log('Closing success dialog')
    setShowSuccessDialog(false)
    // Don't reset transferResult here as we need it for the reset logic
    setTimeout(() => {
      setTransferResult(null)
    }, 100)
  }

  return {
    showSuccessDialog,
    setShowSuccessDialog,
    transferResult,
    setTransferResult,
    errors,
    setErrors,
    handleSuccessDialogClose
  }
}
