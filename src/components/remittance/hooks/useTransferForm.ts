import { useState, useEffect } from "react"
import { TransferFormData, FormErrors } from '../types'
import { ApiService } from '@/services/apiService'
import { fallbackCountries, fallbackCurrencies } from '../utils/currencyUtils'

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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [transferResult, setTransferResult] = useState<any>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading currencies and countries from backend...')
        await ApiService.getCurrencies()
        await ApiService.getCountries()
        console.log('Backend data loaded successfully')
      } catch (error) {
        console.log('Backend unavailable, using fallback data')
        console.error('Data loading error:', error)
      } finally {
        setIsDataLoaded(true)
      }
    }
    loadData()
  }, [])

  const handleCountryChange = async (countryCode: string) => {
    try {
      console.log('Country selected:', countryCode)
      
      // Try to get country data from backend
      let country
      try {
        country = await ApiService.getCountry(countryCode)
      } catch (error) {
        // Fallback to local data
        country = fallbackCountries.find(c => c.code === countryCode)
      }
      
      setFormData(prev => ({
        ...prev,
        recipientCountry: countryCode,
        toCurrency: country?.currency || prev.toCurrency,
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
