
import { useTransferFormCore } from './useTransferFormCore'

export function useTransferForm() {
  const {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
    isDataLoaded,
    handleCountryChange
  } = useTransferFormCore()

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
    isDataLoaded,
    handleCountryChange
  }
}
