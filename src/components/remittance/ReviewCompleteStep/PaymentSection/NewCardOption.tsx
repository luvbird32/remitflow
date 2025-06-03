
import { CreditCard, Check } from "lucide-react"

interface NewCardOptionProps {
  isSelected: boolean
  onSelect: () => void
}

export function NewCardOption({ isSelected, onSelect }: NewCardOptionProps) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'border-coral-500 bg-coral-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-gray-600" />
          <p className="font-medium text-slate-800">Use a different card</p>
        </div>
        {isSelected && <Check className="h-5 w-5 text-coral-500" />}
      </div>
    </div>
  )
}
