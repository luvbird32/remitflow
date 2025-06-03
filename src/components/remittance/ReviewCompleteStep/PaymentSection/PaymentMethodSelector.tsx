
import { SavedCardItem } from './SavedCardItem'
import { NewCardOption } from './NewCardOption'
import { NewCardFields } from './NewCardFields'

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

interface PaymentMethodSelectorProps {
  savedCards: SavedCard[]
  selectedCard: string | null
  useNewCard: boolean
  showPaymentFields: boolean
  onCardSelection: (cardId: string) => void
  onUseNewCard: () => void
  onFieldChange: (field: string, value: string) => void
}

export function PaymentMethodSelector({
  savedCards,
  selectedCard,
  useNewCard,
  showPaymentFields,
  onCardSelection,
  onUseNewCard,
  onFieldChange
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {savedCards.map((card) => (
        <SavedCardItem
          key={card.id}
          card={card}
          isSelected={selectedCard === card.id}
          onSelect={onCardSelection}
        />
      ))}
      
      <NewCardOption
        isSelected={useNewCard}
        onSelect={onUseNewCard}
      />

      {showPaymentFields && useNewCard && (
        <NewCardFields onFieldChange={onFieldChange} />
      )}
    </div>
  )
}
