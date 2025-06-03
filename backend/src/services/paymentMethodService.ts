
export interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export class PaymentMethodService {
  static getSavedCards(): SavedCard[] {
    return [
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
  }

  static getDefaultCard(): SavedCard | null {
    const cards = this.getSavedCards()
    return cards.find(card => card.isDefault) || null
  }

  static validateCard(cardNumber: string): boolean {
    const cleanCardNumber = cardNumber.replace(/\s/g, '')
    return /^\d{16}$/.test(cleanCardNumber)
  }

  static formatCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '')
    return cleaned.replace(/(.{4})/g, '$1 ').trim()
  }
}
