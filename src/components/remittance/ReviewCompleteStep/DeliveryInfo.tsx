
import { CreditCard } from "lucide-react"
import { TransferFormData } from '../types'

interface DeliveryInfoProps {
  formData: TransferFormData
}

export function DeliveryInfo({ formData }: DeliveryInfoProps) {
  const getDeliveryMethodLabel = (method: string) => {
    switch (method) {
      case 'bank': return 'Bank account'
      case 'card': return 'Debit card'
      case 'wallet': return 'Mobile wallet'
      default: return method
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-slate-500" />
        <span className="font-medium text-slate-700">How they'll get it</span>
      </div>
      <div className="pl-6">
        <div className="font-semibold text-slate-800">
          {getDeliveryMethodLabel(formData.deliveryMethod)}
        </div>
      </div>
    </div>
  )
}
