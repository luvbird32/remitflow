
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
    // In production, this would call backend PaymentMethodService.getSavedCards()
    // For now, using fallback data
    setSavedCards(mockSavedCards)
    
    // In production, this would call backend PaymentMethodService.getDefaultCard()
    const defaultCard = mockSavedCards.find(card => card.isDefault)
    if (defaultCard) {
      setSelectedCard(defaultCard.id)
    }
  }, [])

  const handleCardSelection = (cardId: string) => {
    setSelectedCard(cardId)
    setUseNewCard(false)
  }

  const handleUseNewCard = () => {
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
