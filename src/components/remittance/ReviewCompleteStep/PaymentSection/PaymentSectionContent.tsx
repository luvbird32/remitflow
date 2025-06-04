
import { TransferFormData, FormErrors } from '../../types'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { FallbackPaymentForm } from './FallbackPaymentForm'
import { usePaymentMethodManager } from './PaymentMethodManager'
import { Button } from '@/components/ui/button'

interface PaymentSectionContentProps {
  formData: TransferFormData
  showPaymentFields: boolean
  setShowPaymentFields: (show: boolean) => void
  onPaymentFieldChange: (field: string, value: string) => void
  isSubmitting: boolean
  errors: FormErrors
}

export function PaymentSectionContent({
  formData,
  showPaymentFields,
  setShowPaymentFields,
  onPaymentFieldChange,
  isSubmitting,
  errors
}: PaymentSectionContentProps) {
  const {
    savedCards,
    selectedCard,
    useNewCard,
    handleCardSelection,
    handleUseNewCard
  } = usePaymentMethodManager()

  console.log('PaymentSectionContent: Saved cards:', savedCards.length)
  console.log('PaymentSectionContent: Selected card:', selectedCard)
  console.log('PaymentSectionContent: Use new card:', useNewCard)
  console.log('PaymentSectionContent: Show payment fields:', showPaymentFields)

  // Enhanced card selection handler to trigger payment completion
  const handleCardSelectionWithCompletion = (cardId: string) => {
    console.log('PaymentSectionContent: Card selected:', cardId)
    handleCardSelection(cardId)
    
    // Set the selected card info in form data
    const card = savedCards.find(c => c.id === cardId)
    if (card) {
      onPaymentFieldChange('paymentCardNumber', `**** **** **** ${card.last4}`)
      onPaymentFieldChange('paymentName', 'Card on file')
    }
    
    // Auto-show submit button after card selection
    if (!showPaymentFields) {
      setShowPaymentFields(true)
    }
  }

  // Enhanced new card selection to show fields
  const handleUseNewCardWithFields = () => {
    console.log('PaymentSectionContent: Using new card, showing fields')
    handleUseNewCard()
    setShowPaymentFields(true)
  }

  // If we have saved cards, show the card selector
  if (savedCards.length > 0) {
    return (
      <div className="space-y-6">
        <PaymentMethodSelector
          savedCards={savedCards}
          selectedCard={selectedCard}
          useNewCard={useNewCard}
          showPaymentFields={showPaymentFields}
          onCardSelection={handleCardSelectionWithCompletion}
          onUseNewCard={handleUseNewCardWithFields}
          onFieldChange={onPaymentFieldChange}
        />
        
        {/* Show submit button when card is selected */}
        {selectedCard && !useNewCard && (
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Transfer...
                </div>
              ) : (
                'Complete Transfer'
              )}
            </Button>
          </div>
        )}
        
        {/* Show submit button when new card fields are completed */}
        {useNewCard && showPaymentFields && (
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Transfer...
                </div>
              ) : (
                'Complete Transfer'
              )}
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Otherwise, show the fallback payment form
  return (
    <FallbackPaymentForm
      showPaymentFields={showPaymentFields}
      isSubmitting={isSubmitting}
      onShowPaymentFields={() => setShowPaymentFields(true)}
      onFieldChange={onPaymentFieldChange}
    />
  )
}
