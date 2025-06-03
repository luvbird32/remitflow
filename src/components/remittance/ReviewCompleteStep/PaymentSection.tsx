
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TransferFormData, FormErrors } from '../types'
import { PaymentMethodSelector } from './PaymentSection/PaymentMethodSelector'
import { FallbackPaymentForm } from './PaymentSection/FallbackPaymentForm'
import { usePaymentMethodManager } from './PaymentSection/PaymentMethodManager'

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
  const {
    savedCards,
    selectedCard,
    useNewCard,
    handleCardSelection,
    handleUseNewCard
  } = usePaymentMethodManager()

  return (
    <Card className="modern-card">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-500 rounded-xl flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Payment Method</h4>
        </div>

        {savedCards.length > 0 ? (
          <div className="space-y-4">
            <p className="text-slate-600">
              Choose how to pay for this transfer
            </p>
            
            <PaymentMethodSelector
              savedCards={savedCards}
              selectedCard={selectedCard}
              useNewCard={useNewCard}
              showPaymentFields={showPaymentFields}
              onCardSelection={(cardId) => handleCardSelection(cardId, setShowPaymentFields)}
              onUseNewCard={() => handleUseNewCard(setShowPaymentFields)}
              onFieldChange={onPaymentFieldChange}
            />

            <Button
              type="submit"
              disabled={isSubmitting || (!selectedCard && !useNewCard)}
              className="w-full h-16 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 font-bold"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending money...
                </div>
              ) : (
                <>
                  Send Money
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <FallbackPaymentForm
            showPaymentFields={showPaymentFields}
            isSubmitting={isSubmitting}
            onShowPaymentFields={() => setShowPaymentFields(true)}
            onFieldChange={onPaymentFieldChange}
          />
        )}
      </CardContent>
    </Card>
  )
}
