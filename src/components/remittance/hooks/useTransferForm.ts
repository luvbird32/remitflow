
import { useState, useEffect } from "react"
import { TransferFormData, FormErrors } from '../types'
import { ApiService } from '@/services/apiService'
import { countries, loadCurrenciesAndCountries } from '../transferUtils'

export function useTransferForm() {
  const [formData, setFormData] = useState<TransferFormData>({
    amount: "",
    recipientName: "",
    recipientEmail: "",
    recipientCountry: "",
    deliveryMethod: "",
    fromCurrency: "USD",
    toCurrency: "EUR",
    accountNumber: "",
    bankName: "",
    cardNumber: "",
    cardIssuer: "",
    mobileNumber: "",
    mobileProvider: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [transferResult, setTransferResult] = useState<any>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadCurrenciesAndCountries()
      } catch (error) {
        console.log('Using fallback data for transfer form')
      } finally {
        setIsDataLoaded(true)
      }
    }
    loadData()
  }, [])

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c: any) => c.code === countryCode)
    setFormData(prev => ({
      ...prev,
      recipientCountry: countryCode,
      toCurrency: (country as any)?.currency || prev.toCurrency,
      deliveryMethod: ""
    }))
  }

  const updateFormData = (updates: Partial<TransferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    setTransferResult(null)
    setFormData({
      amount: "",
      recipientName: "",
      recipientEmail: "",
      recipientCountry: "",
      deliveryMethod: "",
      fromCurrency: "USD",
      toCurrency: "EUR",
      accountNumber: "",
      bankName: "",
      cardNumber: "",
      cardIssuer: "",
      mobileNumber: "",
      mobileProvider: ""
    })
    setErrors({})
  }

  return {
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
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
