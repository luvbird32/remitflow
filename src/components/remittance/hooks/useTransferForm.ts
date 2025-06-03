
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
        console.log('Loading currencies and countries data...')
        await loadCurrenciesAndCountries()
        console.log('Data loaded successfully')
      } catch (error) {
        console.log('API unavailable, using fallback data for transfer form')
        console.error('Data loading error:', error)
      } finally {
        setIsDataLoaded(true)
      }
    }
    loadData()
  }, [])

  const handleCountryChange = (countryCode: string) => {
    try {
      const country = countries.find((c: any) => c?.code === countryCode)
      console.log('Country selected:', countryCode, country)
      
      setFormData(prev => ({
        ...prev,
        recipientCountry: countryCode,
        toCurrency: (country as any)?.currency || prev.toCurrency,
        deliveryMethod: ""
      }))
    } catch (error) {
      console.error('Error handling country change:', error)
    }
  }

  const updateFormData = (updates: Partial<TransferFormData>) => {
    try {
      setFormData(prev => ({ ...prev, ...updates }))
    } catch (error) {
      console.error('Error updating form data:', error)
    }
  }

  const handleSuccessDialogClose = () => {
    try {
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
    } catch (error) {
      console.error('Error closing success dialog:', error)
    }
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
