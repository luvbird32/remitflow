
import { AlertCircle, CreditCard, Clock } from "lucide-react"
import { deliveryMethodLabels, deliveryTimeframes, countries } from './transferUtils'
import { FormErrors } from './types'

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
          <button
            key={method}
            type="button"
            onClick={() => setDeliveryMethod(method)}
            className={`p-4 border rounded-lg text-left transition-all hover:border-blue-300 ${
              deliveryMethod === method 
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
