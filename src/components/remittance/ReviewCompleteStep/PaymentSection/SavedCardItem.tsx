
import { Check } from "lucide-react"
import { CreditCard } from "lucide-react"

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

interface SavedCardItemProps {
  card: SavedCard
  isSelected: boolean
  onSelect: (cardId: string) => void
}

export function SavedCardItem({ card, isSelected, onSelect }: SavedCardItemProps) {
  const getBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return (
          <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
        )
      case 'mastercard':
        return (
          <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MC</span>
          </div>
        )
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'border-coral-500 bg-coral-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(card.id)}
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
        {isSelected && (
          <Check className="h-5 w-5 text-coral-500" />
        )}
      </div>
    </div>
  )
}
