import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, AlertCircle, CheckCircle, CreditCard, Banknote, Phone } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'
import { TransferFormData, FormErrors } from './types'

interface ReviewCompleteStepProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData | ((prev: TransferFormData) => TransferFormData)) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function ReviewCompleteStep({
  formData,
  setFormData,
  isSubmitting,
  errors
}: ReviewCompleteStepProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const convertedAmount = calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  const renderRecipientFields = () => {
    switch (formData.deliveryMethod) {
      case 'bank':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-4">
              <Banknote className="h-4 w-4" />
              Bank Account Details
            </div>
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium mb-2">
                Bank Name
              </label>
              <Input
                id="bankName"
                type="text"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
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
              <label htmlFor="accountNumber" className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
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
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-4">
              <CreditCard className="h-4 w-4" />
              Debit Card Details
            </div>
            <div>
              <label htmlFor="cardIssuer" className="block text-sm font-medium mb-2">
                Card Issuer
              </label>
              <Select 
                value={formData.cardIssuer} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, cardIssuer: value }))}
              >
                <SelectTrigger className={errors.cardIssuer ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select card issuer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                </SelectContent>
              </Select>
              {errors.cardIssuer && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.cardIssuer}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
                  setFormData(prev => ({ ...prev, cardNumber: value }))
                }}
                className={errors.cardNumber ? "border-red-500" : ""}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.cardNumber}
                </p>
              )}
            </div>
          </div>
        )
      
      case 'mobile':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-4">
              <Phone className="h-4 w-4" />
              Mobile Money Details
            </div>
            <div>
              <label htmlFor="mobileProvider" className="block text-sm font-medium mb-2">
                Mobile Provider
              </label>
              <Select 
                value={formData.mobileProvider} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, mobileProvider: value }))}
              >
                <SelectTrigger className={errors.mobileProvider ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select mobile provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="mtn">MTN Money</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="tigo">Tigo Pesa</SelectItem>
                  <SelectItem value="vodacom">Vodacom M-Pesa</SelectItem>
                </SelectContent>
              </Select>
              {errors.mobileProvider && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.mobileProvider}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium mb-2">
                Mobile Number
              </label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+1234567890"
                value={formData.mobileNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                className={errors.mobileNumber ? "border-red-500" : ""}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.mobileNumber}
                </p>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  const isFormComplete = () => {
    if (!formData.amount || !formData.recipientCountry || !formData.deliveryMethod) return false
    
    switch (formData.deliveryMethod) {
      case 'bank':
        return formData.bankName && formData.accountNumber
      case 'card':
        return formData.cardIssuer && formData.cardNumber
      case 'mobile':
        return formData.mobileProvider && formData.mobileNumber
      default:
        return false
    }
  }

  const handleReviewClick = () => {
    setShowConfirmDialog(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
          Review & Complete
        </div>

        {/* Exchange Rate Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-700">
                  {fromCurrencyData?.symbol}{formData.amount}
                </div>
                <div className="text-sm text-blue-600">{formData.fromCurrency}</div>
              </div>
              <ArrowRight className="h-6 w-6 text-blue-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-green-700">
                  {toCurrencyData?.symbol}{convertedAmount}
                </div>
                <div className="text-sm text-green-600">{formData.toCurrency}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
              <div className="text-center">
                <div className="text-xs text-gray-500">Exchange Rate</div>
                <div className="font-medium">1 {formData.fromCurrency} = {toCurrencyData?.rate} {formData.toCurrency}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Transfer Fee</div>
                <div className="font-medium">${fee.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Delivery Time</div>
                <div className="font-medium">{deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Method Confirmation */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">
                {deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}
              </div>
              <div className="text-sm text-blue-600">
                to {formData.recipientName} in {selectedCountry?.flag} {selectedCountry?.name}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}
          </Badge>
        </div>

        {/* Recipient Details */}
        {renderRecipientFields()}

        <Button 
          type="button" 
          onClick={handleReviewClick}
          className="w-full h-12 text-base" 
          disabled={!isFormComplete()}
        >
          Review Transfer Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-700">
              Confirm Your Transfer
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Please review the details below and confirm to send your transfer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Transfer Summary */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">You send:</span>
                <span className="font-medium">{fromCurrencyData?.symbol}{formData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Transfer fee:</span>
                <span className="font-medium">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium">Total amount:</span>
                <span className="font-bold">{fromCurrencyData?.symbol}{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recipient gets:</span>
                <span className="font-bold text-green-700">{toCurrencyData?.symbol}{convertedAmount}</span>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recipient:</span>
                <span className="font-medium">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Country:</span>
                <span className="font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Delivery method:</span>
                <span className="font-medium">{deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowConfirmDialog(false)}>
                Review Details
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isSubmitting}
                onClick={() => {
                  setShowConfirmDialog(false)
                  // This will trigger the form submission in the parent component
                  const form = document.querySelector('form') as HTMLFormElement
                  if (form) {
                    form.requestSubmit()
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Confirm & Send
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
