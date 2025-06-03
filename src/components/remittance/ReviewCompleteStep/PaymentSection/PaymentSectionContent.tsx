import { TransferFormData, FormErrors } from '../../types'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { FallbackPaymentForm } from './FallbackPaymentForm'
import { usePaymentMethodManager } from './PaymentMethodManager'

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

  // If we have saved cards, show the card selector
  if (savedCards.length > 0) {
    return (
      <PaymentMethodSelector
        savedCards={savedCards}
        selectedCard={selectedCard}
        useNewCard={useNewCard}
        showPaymentFields={showPaymentFields}
        onCardSelection={handleCardSelection}
        onUseNewCard={handleUseNewCard}
        onFieldChange={onPaymentFieldChange}
      />
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
