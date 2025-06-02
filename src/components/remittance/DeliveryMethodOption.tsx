
import { CreditCard, Clock, CheckCircle } from "lucide-react"
import { deliveryMethodLabels, deliveryTimeframes } from './transferUtils'

interface DeliveryMethodOptionProps {
  method: string
  isSelected: boolean
  onClick: () => void
}

export function DeliveryMethodOption({ method, isSelected, onClick }: DeliveryMethodOptionProps) {
  const getFeeText = (method: string) => {
    switch (method) {
      case 'bank': return 'Free'
      case 'card': return '+$1.99'
      default: return '+$0.99'
    }
  }

  const getFeeColor = (method: string) => {
    return method === 'bank' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:border-teal-300 hover:shadow-xl hover:-translate-y-1 group ${
        isSelected 
          ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-2xl shadow-teal-500/20 scale-105' 
          : 'border-slate-200 bg-white/80 hover:bg-teal-50/50'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg' 
              : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'
          }`}>
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-lg mb-1">
              {deliveryMethodLabels[method as keyof typeof deliveryMethodLabels]}
            </div>
            <div className="text-sm text-slate-500 flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              {deliveryTimeframes[method as keyof typeof deliveryTimeframes]}
            </div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${getFeeColor(method)}`}>
          {getFeeText(method)}
        </div>
      </div>
    </button>
  )
}
