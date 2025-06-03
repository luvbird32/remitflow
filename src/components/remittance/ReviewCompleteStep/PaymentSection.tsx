
import { useState } from "react"
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TransferFormData, FormErrors } from '../types'

interface PaymentSectionProps {
  formData: TransferFormData
  showPaymentFields: boolean
  setShowPaymentFields: (show: boolean) => void
  onPaymentFieldChange: (field: string, value: string) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function PaymentSection({
  formData,
  showPaymentFields,
  setShowPaymentFields,
  onPaymentFieldChange,
  isSubmitting,
  errors
}: PaymentSectionProps) {
  return (
    <Card className="modern-card">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-500 rounded-xl flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Payment Method</h4>
        </div>

        {!showPaymentFields ? (
          <div className="space-y-4">
            <p className="text-slate-600">
              Choose how you'd like to pay for this transfer
            </p>
            <Button
              type="button"
              onClick={() => setShowPaymentFields(true)}
              className="w-full h-14 text-lg bg-gradient-to-r from-coral-500 to-orange-500 hover:from-coral-600 hover:to-orange-600"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pay with Card
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="form-label">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className="form-input h-12"
                  onChange={(e) => onPaymentFieldChange('paymentCardNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  className="form-input h-12"
                  onChange={(e) => onPaymentFieldChange('paymentExpiry', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="form-label">CVV</label>
                <Input
                  placeholder="123"
                  className="form-input h-12"
                  onChange={(e) => onPaymentFieldChange('paymentCvv', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">Cardholder Name</label>
                <Input
                  placeholder="John Doe"
                  className="form-input h-12"
                  onChange={(e) => onPaymentFieldChange('paymentName', e.target.value)}
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
      </CardContent>
    </Card>
  )
}
