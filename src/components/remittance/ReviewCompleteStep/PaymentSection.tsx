
import { useState, useEffect } from "react"
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TransferFormData, FormErrors } from '../types'
import { PaymentMethodSelector } from './PaymentSection/PaymentMethodSelector'
import { FallbackPaymentForm } from './PaymentSection/FallbackPaymentForm'

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

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
  const [savedCards, setSavedCards] = useState<SavedCard[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [useNewCard, setUseNewCard] = useState(false)

  // Mock saved cards - in real app, this would come from user profile/API
  useEffect(() => {
    const mockSavedCards: SavedCard[] = [
      {
        id: "card_1",
        last4: "4567",
        brand: "Visa",
        expiryMonth: 12,
        expiryYear: 25,
        isDefault: true
      },
      {
        id: "card_2", 
        last4: "8901",
        brand: "Mastercard",
        expiryMonth: 8,
        expiryYear: 26,
        isDefault: false
      }
    ]
    setSavedCards(mockSavedCards)
    
    // Auto-select default card if available
    const defaultCard = mockSavedCards.find(card => card.isDefault)
    if (defaultCard) {
      setSelectedCard(defaultCard.id)
    }
  }, [])

  const handleCardSelection = (cardId: string) => {
    setSelectedCard(cardId)
    setUseNewCard(false)
    setShowPaymentFields(false)
  }

  const handleUseNewCard = () => {
    setUseNewCard(true)
    setSelectedCard(null)
    setShowPaymentFields(true)
  }

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
              Choose a payment method for this transfer
            </p>
            
            <PaymentMethodSelector
              savedCards={savedCards}
              selectedCard={selectedCard}
              useNewCard={useNewCard}
              showPaymentFields={showPaymentFields}
              onCardSelection={handleCardSelection}
              onUseNewCard={handleUseNewCard}
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
