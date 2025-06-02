
import { AlertCircle } from "lucide-react"
import { countries } from './transferUtils'
import { FormErrors } from './types'
import { DeliveryMethodOption } from './DeliveryMethodOption'

interface DeliveryMethodStepProps {
  recipientCountry: string
  deliveryMethod: string
  setDeliveryMethod: (method: string) => void
  errors: FormErrors
}

export function DeliveryMethodStep({
  recipientCountry,
  deliveryMethod,
  setDeliveryMethod,
  errors
}: DeliveryMethodStepProps) {
  const selectedCountry = countries.find(c => c.code === recipientCountry)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
        Choose Delivery Method
      </div>
      
      <div className="grid gap-3">
        {selectedCountry?.deliveryMethods.map((method) => (
          <DeliveryMethodOption
            key={method}
            method={method}
            isSelected={deliveryMethod === method}
            onClick={() => setDeliveryMethod(method)}
          />
        ))}
      </div>
      
      {errors.deliveryMethod && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {errors.deliveryMethod}
        </p>
      )}
    </div>
  )
}
