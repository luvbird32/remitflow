
import { useState } from "react"
import { useFormData } from './useFormData'
import { useDataLoading } from './useDataLoading'
import { useCountryHandling } from './useCountryHandling'
import { useFormErrorHandling } from './useFormErrorHandling'
import { useApiErrorHandling } from './useApiErrorHandling'

export function useTransferForm() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [transferResult, setTransferResult] = useState<any>(null)

  const { formData, setFormData, updateFormData, resetFormData } = useFormData()
  const { isDataLoaded } = useDataLoading()
  const { handleCountryChange } = useCountryHandling(updateFormData)
  const { 
    errors,
    setErrors,
    clearErrors, 
    handleFormError, 
    validateField, 
    hasErrors 
  } = useFormErrorHandling()
  const { handleApiError } = useApiErrorHandling()

  const handleSuccessDialogClose = () => {
    try {
      setShowSuccessDialog(false)
      setTransferResult(null)
      resetFormData()
      clearErrors()
    } catch (error) {
      handleFormError(error as Error, 'Closing success dialog')
    }
  }

  const handleTransferSubmission = async (submitFn: () => Promise<any>) => {
    try {
      clearErrors()
      const result = await submitFn()
      setTransferResult(result)
      setShowSuccessDialog(true)
      return result
    } catch (error) {
      const shouldRetry = handleApiError(error, 'Transfer submission')
      if (!shouldRetry) {
        handleFormError(error as Error, 'Transfer submission failed')
      }
      throw error
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
    hasErrors,
    handleCountryChange,
    updateFormData,
    handleSuccessDialogClose,
    handleTransferSubmission,
    handleFormError,
    validateField,
    clearErrors
  }
}
