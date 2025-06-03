
import { useState } from "react"
import { FormErrors } from '../types'
import { useFormData } from './useFormData'
import { useDataLoading } from './useDataLoading'
import { useCountryHandling } from './useCountryHandling'

export function useTransferForm() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [transferResult, setTransferResult] = useState<any>(null)

  const { formData, setFormData, updateFormData, resetFormData } = useFormData()
  const { isDataLoaded } = useDataLoading()
  const { handleCountryChange } = useCountryHandling(updateFormData)

  const handleSuccessDialogClose = () => {
    try {
      setShowSuccessDialog(false)
      setTransferResult(null)
      resetFormData()
      setErrors({})
    } catch (error) {
      console.error('Error closing success dialog:', error)
    }
  }

  return {
    formData,
    setFormData,
    showSuccessDialog,
    setShowSuccessDialog,
    errors,
    setErrors,
    transferResult,
    setTransferResult,
    isDataLoaded,
    handleCountryChange,
    updateFormData,
    handleSuccessDialogClose
  }
}
