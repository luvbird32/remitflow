
import { useState, useEffect } from "react"
import { CreditCard, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TransferFormData, FormErrors } from '../types'

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

  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">VISA</span>
        </div>
      case 'mastercard':
        return <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">MC</span>
        </div>
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />
    }
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
            
            {/* Saved Cards */}
            <div className="space-y-3">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCard === card.id 
                      ? 'border-coral-500 bg-coral-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCardSelection(card.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getBrandIcon(card.brand)}
                      <div>
                        <p className="font-medium text-slate-800">
                          •••• •••• •••• {card.last4}
                        </p>
                        <p className="text-sm text-slate-600">
                          Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                        </p>
                      </div>
                      {card.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    {selectedCard === card.id && (
                      <Check className="h-5 w-5 text-coral-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Use New Card Option */}
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                useNewCard 
                  ? 'border-coral-500 bg-coral-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={handleUseNewCard}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <p className="font-medium text-slate-800">Use a different card</p>
                </div>
                {useNewCard && <Check className="h-5 w-5 text-coral-500" />}
              </div>
            </div>

            {/* New Card Fields */}
            {showPaymentFields && useNewCard && (
              <div className="space-y-6 mt-6 p-4 border-t">
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
              </div>
            )}

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
          // Fallback to original flow if no saved cards
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
            
            {showPaymentFields && (
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
          </div>
        )}
      </CardContent>
    </Card>
  )
}
