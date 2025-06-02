
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, DollarSign } from "lucide-react"
import { AmountDestinationStep } from './AmountDestinationStep'
import { DeliveryMethodStep } from './DeliveryMethodStep'
import { ReviewCompleteStep } from './ReviewCompleteStep'
import { TransferSuccessDialog } from './TransferSuccessDialog'
import { ApiService } from '@/services/apiService'
import { TransferFormData, FormErrors } from './types'

/**
 * Main transfer form component that handles the multi-step money transfer process
 * @returns JSX element containing the complete transfer form with steps
 */
export function TransferForm() {
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
  const [countries, setCountries] = useState([])
  const [transferResult, setTransferResult] = useState<any>(null)

  /**
   * Load countries and currencies from backend on component mount
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        const countriesData = await ApiService.getCountries()
        setCountries(countriesData)
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }
    loadData()
  }, [])

  /**
   * Handles country selection and auto-updates currency
   * @param countryCode - Selected country code
   */
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c: any) => c.code === countryCode)
    setFormData(prev => ({
      ...prev,
      recipientCountry: countryCode,
      toCurrency: (country as any)?.currency || prev.toCurrency,
      deliveryMethod: "" // Reset delivery method when country changes
    }))
  }

  /**
   * Handles form submission and transfer creation
   * @param e - Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      const result = await ApiService.createTransfer(formData)
      setTransferResult(result)
      setShowSuccessDialog(true)
    } catch (error: any) {
      if (error.message.includes('errors')) {
        // Handle validation errors from backend
        const errorData = JSON.parse(error.message)
        const newErrors: FormErrors = {}
        errorData.errors.forEach((err: any) => {
          newErrors[err.field] = err.message
        })
        setErrors(newErrors)
      } else {
        console.error('Transfer submission error:', error)
        setErrors({ general: 'Failed to submit transfer. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handles success dialog close and form reset
   */
  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    setTransferResult(null)
    // Reset form on success
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

  const showStep2 = formData.amount && formData.recipientName && formData.recipientCountry
  const showStep3 = showStep2 && formData.deliveryMethod

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
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Amount and Destination */}
            <AmountDestinationStep
              amount={formData.amount}
              setAmount={(amount) => setFormData(prev => ({ ...prev, amount }))}
              recipientName={formData.recipientName}
              setRecipientName={(name) => setFormData(prev => ({ ...prev, recipientName: name }))}
              recipientCountry={formData.recipientCountry}
              onCountryChange={handleCountryChange}
              fromCurrency={formData.fromCurrency}
              setFromCurrency={(currency) => setFormData(prev => ({ ...prev, fromCurrency: currency }))}
              errors={errors}
            />

            {/* Step 2: Delivery Method */}
            {showStep2 && (
              <>
                <div className="flex items-center justify-center">
                  <ArrowDown className="h-5 w-5 text-gray-400" />
                </div>
                
                <DeliveryMethodStep
                  recipientCountry={formData.recipientCountry}
                  deliveryMethod={formData.deliveryMethod}
                  setDeliveryMethod={(method) => setFormData(prev => ({ ...prev, deliveryMethod: method }))}
                  errors={errors}
                />
              </>
            )}

            {/* Step 3: Review & Complete */}
            {showStep3 && (
              <>
                <div className="flex items-center justify-center">
                  <ArrowDown className="h-5 w-5 text-gray-400" />
                </div>
                
                <ReviewCompleteStep
                  formData={formData}
                  setFormData={setFormData}
                  isSubmitting={isSubmitting}
                  errors={errors}
                />
              </>
            )}

            {errors.general && (
              <div className="text-red-500 text-sm text-center">
                {errors.general}
              </div>
            )}
          </form>
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
