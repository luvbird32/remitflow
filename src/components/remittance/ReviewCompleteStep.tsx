
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CreditCard, Building, Smartphone, ArrowRight } from "lucide-react"
import { TransferFormData, FormErrors } from './types'
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'

interface ReviewCompleteStepProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function ReviewCompleteStep({
  formData,
  setFormData,
  isSubmitting,
  errors
}: ReviewCompleteStepProps) {
  const [showPaymentFields, setShowPaymentFields] = useState(false)

  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const convertedAmount = calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  const handlePaymentFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const renderPaymentFields = () => {
    switch (formData.deliveryMethod) {
      case 'bank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Building className="h-4 w-4 inline mr-1" />
                Bank Name
              </label>
              <Input
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => handlePaymentFieldChange('bankName', e.target.value)}
                className={errors.bankName ? "border-red-500" : ""}
              />
              {errors.bankName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.bankName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <Input
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => handlePaymentFieldChange('accountNumber', e.target.value)}
                className={errors.accountNumber ? "border-red-500" : ""}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.accountNumber}
                </p>
              )}
            </div>
          </div>
        )
      
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <CreditCard className="h-4 w-4 inline mr-1" />
                Card Number
              </label>
              <Input
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={(e) => handlePaymentFieldChange('cardNumber', e.target.value)}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.cardNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Card Issuer
              </label>
              <Input
                placeholder="Enter card issuer (e.g., Visa, Mastercard)"
                value={formData.cardIssuer}
                onChange={(e) => handlePaymentFieldChange('cardIssuer', e.target.value)}
                className={errors.cardIssuer ? "border-red-500" : ""}
              />
              {errors.cardIssuer && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.cardIssuer}
                </p>
              )}
            </div>
          </div>
        )
      
      case 'wallet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Smartphone className="h-4 w-4 inline mr-1" />
                Mobile Number
              </label>
              <Input
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={(e) => handlePaymentFieldChange('mobileNumber', e.target.value)}
                className={errors.mobileNumber ? "border-red-500" : ""}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.mobileNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Provider
              </label>
              <Input
                placeholder="Enter mobile provider (e.g., M-Pesa, MTN)"
                value={formData.mobileProvider}
                onChange={(e) => handlePaymentFieldChange('mobileProvider', e.target.value)}
                className={errors.mobileProvider ? "border-red-500" : ""}
              />
              {errors.mobileProvider && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.mobileProvider}
                </p>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
        Review & Complete Transfer
      </div>

      {/* Transfer Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Transfer Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">You send:</span>
            <span className="font-medium">{fromCurrencyData?.symbol}{formData.amount} {formData.fromCurrency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Transfer fee:</span>
            <span className="font-medium">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-blue-700">Total amount:</span>
            <span className="font-medium">{fromCurrencyData?.symbol}{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Exchange rate:</span>
            <span className="font-medium">1 {formData.fromCurrency} = {toCurrencyData?.rate} {formData.toCurrency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">{formData.recipientName} receives:</span>
            <span className="font-medium text-green-600">{toCurrencyData?.symbol}{convertedAmount} {formData.toCurrency}</span>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Recipient Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Country:</span>
            <span className="font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery method:</span>
            <span className="font-medium">{deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated delivery:</span>
            <span className="font-medium">{deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Details */}
      {!showPaymentFields ? (
        <Button 
          type="button" 
          onClick={() => setShowPaymentFields(true)}
          className="w-full"
        >
          Continue to Payment Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Payment Details</h4>
          {renderPaymentFields()}
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing Transfer..." : `Send ${fromCurrencyData?.symbol}${totalAmount}`}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
