
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, DollarSign } from "lucide-react"
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
        <div className="step-indicator">3</div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Review & Complete Transfer</h3>
          <p className="text-sm text-slate-500 font-normal">Verify your details and complete the payment</p>
        </div>
      </div>

      <div className="modern-card p-8 animate-scale-in">
        <TransferSummary formData={formData} />
      </div>

      {/* Security Notice */}
      <div className="modern-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 animate-scale-in" style={{animationDelay: '0.1s'}}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-2">Secure Transaction</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your transfer is protected by bank-level encryption and real-time fraud monitoring. 
              We guarantee secure delivery of your funds.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {!showPaymentFields ? (
        <div className="modern-card p-8 text-center animate-scale-in" style={{animationDelay: '0.2s'}}>
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-coral-500/25">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Ready to Send</h4>
            <p className="text-slate-600">Click below to proceed with payment details</p>
          </div>
          
          <Button 
            type="button" 
            onClick={() => setShowPaymentFields(true)}
            className="btn-primary px-8 py-4 text-base font-semibold"
          >
            Continue to Payment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="modern-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Payment Details</h4>
            </div>
            <PaymentMethodFields
              formData={formData}
              onFieldChange={handlePaymentFieldChange}
              errors={errors}
            />
          </div>
          
          <div className="modern-card p-8 bg-gradient-to-r from-coral-50 to-orange-50 border-coral-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-coral-600" />
                <span className="font-semibold text-slate-800">Total Amount</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">
                  {fromCurrencyData?.symbol}{totalAmount}
                </div>
                <div className="text-sm text-slate-500">including fees</div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="btn-secondary w-full py-4 text-lg font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Transfer...
                </div>
              ) : (
                <>
                  Send {fromCurrencyData?.symbol}{totalAmount}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
