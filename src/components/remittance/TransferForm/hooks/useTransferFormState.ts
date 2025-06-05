
import { useState } from "react"

export function useTransferFormState() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [transferResult, setTransferResult] = useState<any>(null)

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    setTransferResult(null)
  }

  const handleNewTransfer = () => {
    setShowSuccessDialog(false)
    setTransferResult(null)
  }

  return {
    showSuccessDialog,
    setShowSuccessDialog,
    transferResult,
    setTransferResult,
    handleSuccessDialogClose,
    handleNewTransfer
  }
}
