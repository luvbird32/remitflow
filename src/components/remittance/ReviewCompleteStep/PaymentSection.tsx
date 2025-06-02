
import { Button } from "@/components/ui/button"
import { ArrowRight, DollarSign, Clock } from "lucide-react"
import { PaymentMethodFields } from '../PaymentMethodFields'
import { TransferFormData, FormErrors } from '../types'
import { currencies, calculateFee } from '../transferUtils'

/**
 * Props interface for the PaymentSection component
 */
interface PaymentSectionProps {
  /** Current transfer form data */
  formData: TransferFormData
  /** Whether payment fields are currently shown */
  showPaymentFields: boolean
  /** Function to toggle payment fields visibility */
  setShowPaymentFields: (show: boolean) => void
  /** Handler for payment field changes */
  onPaymentFieldChange: (field: string, value: string) => void
  /** Whether the form is currently being submitted */
  isSubmitting: boolean
  /** Current form validation errors */
  errors: FormErrors
}

/**
 * Payment section component that handles the payment flow in the review step.
 * 
 * This component manages two states:
 * 1. Initial payment prompt with total amount display
 * 2. Payment details form for entering payment information
 * 
 * @param props - Component props containing payment state and handlers
 * @returns JSX element with payment interface
 */
export function PaymentSection({
  formData,
  showPaymentFields,
  setShowPaymentFields,
  onPaymentFieldChange,
  isSubmitting,
  errors
}: PaymentSectionProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  if (!showPaymentFields) {
    return (
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
    )
  }

  return (
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
          onFieldChange={onPaymentFieldChange}
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
  )
}
