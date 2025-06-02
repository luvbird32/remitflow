
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
        <div className="step-indicator">2</div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Choose Delivery Method</h3>
          <p className="text-sm text-slate-500 font-normal">Select how your recipient will receive the money</p>
        </div>
      </div>
      
      <div className="grid gap-4">
        {selectedCountry?.deliveryMethods.map((method, index) => (
          <div key={method} className="animate-scale-in" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
            <DeliveryMethodOption
              method={method}
              isSelected={deliveryMethod === method}
              onClick={() => setDeliveryMethod(method)}
            />
          </div>
        ))}
      </div>
      
      {errors.deliveryMethod && (
        <div className="modern-card p-4 border-red-200 bg-red-50/80">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {errors.deliveryMethod}
          </p>
        </div>
      )}
    </div>
  )
}
