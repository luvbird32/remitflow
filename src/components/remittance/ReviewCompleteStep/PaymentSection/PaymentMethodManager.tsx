
import { useState, useEffect } from "react"

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

// Fallback data for when backend is unavailable
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

export function usePaymentMethodManager() {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [useNewCard, setUseNewCard] = useState(false)

  useEffect(() => {
    console.log('PaymentMethodManager: Initializing saved cards...')
    // In production, this would call backend PaymentMethodService.getSavedCards()
    setSavedCards(mockSavedCards)
    
    // Auto-select default card
    const defaultCard = mockSavedCards.find(card => card.isDefault)
    if (defaultCard) {
      console.log('PaymentMethodManager: Auto-selecting default card:', defaultCard.id)
      setSelectedCard(defaultCard.id)
      setUseNewCard(false)
    }
  }, [])

  const handleCardSelection = (cardId: string) => {
    console.log('PaymentMethodManager: Card selected:', cardId)
    setSelectedCard(cardId)
    setUseNewCard(false)
  }

  const handleUseNewCard = () => {
    console.log('PaymentMethodManager: Using new card')
    setUseNewCard(true)
    setSelectedCard(null)
  }

  return {
    savedCards,
    selectedCard,
    useNewCard,
    handleCardSelection,
    handleUseNewCard
  }
}
