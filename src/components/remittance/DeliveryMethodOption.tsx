
import { CreditCard, Clock } from "lucide-react"
import { deliveryMethodLabels, deliveryTimeframes } from './transferUtils'

interface DeliveryMethodOptionProps {
  method: string
  isSelected: boolean
  onClick: () => void
}

export function DeliveryMethodOption({ method, isSelected, onClick }: DeliveryMethodOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 border rounded-lg text-left transition-all hover:border-blue-300 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <div>
            <div className="font-medium">
              {deliveryMethodLabels[method as keyof typeof deliveryMethodLabels]}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deliveryTimeframes[method as keyof typeof deliveryTimeframes]}
            </div>
          </div>
        </div>
        <div className="text-sm font-medium">
          {method === 'bank' ? 'Free' : 
           method === 'card' ? '+$1.99' : '+$0.99'}
        </div>
      </div>
    </button>
  )
}
