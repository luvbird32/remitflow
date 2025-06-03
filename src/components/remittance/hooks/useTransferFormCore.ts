
import { useFormData } from './useFormData'
import { useDataLoading } from './useDataLoading'
import { useCountryHandling } from './useCountryHandling'

export function useTransferFormCore() {
  const { formData, setFormData, updateFormData, resetFormData } = useFormData()
  const { isDataLoaded } = useDataLoading()
  const { handleCountryChange } = useCountryHandling(updateFormData)

  return {
    formData,
    setFormData,
    updateFormData,
    resetFormData,
    isDataLoaded,
    handleCountryChange
  }
}
