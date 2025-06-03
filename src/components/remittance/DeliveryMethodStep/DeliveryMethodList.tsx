
import { DeliveryMethodOption } from '../DeliveryMethodOption'
import { countries } from '../transferUtils'

interface DeliveryMethodListProps {
  recipientCountry: string
  deliveryMethod: string
  onMethodSelect: (method: string) => void
}

export function DeliveryMethodList({
  recipientCountry,
  deliveryMethod,
  onMethodSelect
}: DeliveryMethodListProps) {
  const selectedCountry = countries.find(c => c.code === recipientCountry)

  if (!selectedCountry) {
    return null
  }

  return (
    <div className="grid gap-4">
      {selectedCountry.deliveryMethods.map((method, index) => (
        <div key={method} className="animate-scale-in" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
          <DeliveryMethodOption
            method={method}
            isSelected={deliveryMethod === method}
            onClick={() => onMethodSelect(method)}
          />
        </div>
      ))}
    </div>
  )
}
