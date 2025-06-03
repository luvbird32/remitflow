
import { useState, useEffect } from "react"

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export function usePaymentMethodManager() {
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

  const handleCardSelection = (cardId: string, setShowPaymentFields: (show: boolean) => void) => {
    setSelectedCard(cardId)
    setUseNewCard(false)
    setShowPaymentFields(false)
  }

  const handleUseNewCard = (setShowPaymentFields: (show: boolean) => void) => {
    setUseNewCard(true)
    setSelectedCard(null)
    setShowPaymentFields(true)
  }

  return {
    savedCards,
    selectedCard,
    useNewCard,
    handleCardSelection,
    handleUseNewCard
  }
}
