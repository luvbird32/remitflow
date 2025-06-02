
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, DollarSign } from "lucide-react"
import { AmountDestinationStep } from './AmountDestinationStep'
import { DeliveryMethodStep } from './DeliveryMethodStep'
import { ReviewCompleteStep } from './ReviewCompleteStep'
import { countries, calculateConvertedAmount, calculateFee } from './transferUtils'
import { TransferFormData, FormErrors } from './types'

export function TransferForm() {
  const [formData, setFormData] = useState<TransferFormData>({
    amount: "",
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
  const [errors, setErrors] = useState<FormErrors>({})

  // Auto-update currency when country changes
  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode)
    setFormData(prev => ({
      ...prev,
      recipientCountry: countryCode,
      toCurrency: country?.currency || prev.toCurrency,
      deliveryMethod: "" // Reset delivery method when country changes
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (parseFloat(formData.amount) < 1) {
      newErrors.amount = "Minimum transfer amount is $1"
    } else if (parseFloat(formData.amount) > 10000) {
      newErrors.amount = "Maximum transfer amount is $10,000"
    }

    if (!formData.recipientCountry) {
      newErrors.recipientCountry = "Please select recipient country"
    }

    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = "Please select delivery method"
    }

    // Validate based on delivery method
    if (formData.deliveryMethod === 'bank') {
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Account number is required"
      }
      if (!formData.bankName) {
        newErrors.bankName = "Bank name is required"
      }
    } else if (formData.deliveryMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number"
      }
      if (!formData.cardIssuer) {
        newErrors.cardIssuer = "Card issuer is required"
      }
    } else if (formData.deliveryMethod === 'mobile') {
      if (!formData.mobileNumber) {
        newErrors.mobileNumber = "Mobile number is required"
      }
      if (!formData.mobileProvider) {
        newErrors.mobileProvider = "Mobile provider is required"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Transfer submitted:", { 
      ...formData,
      convertedAmount: calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency),
      fee: calculateFee(formData.amount, formData.deliveryMethod)
    })
    
    setIsSubmitting(false)
    // Reset form on success
    setFormData({
      amount: "",
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

  const showStep2 = formData.amount && formData.recipientCountry
  const showStep3 = showStep2 && formData.deliveryMethod

  return (
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
        </form>
      </CardContent>
    </Card>
  )
}
