
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FallbackPaymentFormProps {
  showPaymentFields: boolean
  isSubmitting: boolean
  onShowPaymentFields: () => void
  onFieldChange: (field: string, value: string) => void
}

export function FallbackPaymentForm({ 
  showPaymentFields, 
  isSubmitting, 
  onShowPaymentFields, 
  onFieldChange 
}: FallbackPaymentFormProps) {
  return (
    <div className="space-y-4">
      <p className="text-slate-600">
        Choose how you'd like to pay for this transfer
      </p>
      <Button
        type="button"
        onClick={onShowPaymentFields}
        className="w-full h-14 text-lg bg-gradient-to-r from-coral-500 to-orange-500 hover:from-coral-600 hover:to-orange-600"
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Pay with Card
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      {showPaymentFields && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="form-label">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                className="form-input h-12"
                onChange={(e) => onFieldChange('paymentCardNumber', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label">Expiry Date</label>
              <Input
                placeholder="MM/YY"
                className="form-input h-12"
                onChange={(e) => onFieldChange('paymentExpiry', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="form-label">CVV</label>
              <Input
                placeholder="123"
                className="form-input h-12"
                onChange={(e) => onFieldChange('paymentCvv', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label">Cardholder Name</label>
              <Input
                placeholder="John Doe"
                className="form-input h-12"
                onChange={(e) => onFieldChange('paymentName', e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-bold"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing Transfer...
              </div>
            ) : (
              <>
                Complete Transfer
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
