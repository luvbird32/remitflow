
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TransferFormData, FormErrors } from './types'
import { TransferSummary } from './TransferSummary'
import { PaymentMethodFields } from './PaymentMethodFields'
import { currencies, calculateFee } from './transferUtils'

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
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  const handlePaymentFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-teal-600">
        <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-xs">3</div>
        Review & Complete Transfer
      </div>

      <TransferSummary formData={formData} />

      {/* Payment Method Details */}
      {!showPaymentFields ? (
        <Button 
          type="button" 
          onClick={() => setShowPaymentFields(true)}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
        >
          Continue to Payment Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Payment Details</h4>
          <PaymentMethodFields
            formData={formData}
            onFieldChange={handlePaymentFieldChange}
            errors={errors}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-coral-500 to-orange-400 hover:from-coral-600 hover:to-orange-500"
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
