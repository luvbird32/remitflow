
import { FormErrors } from './types'
import { RemittanceErrorBoundary } from './ErrorBoundary'
import { DeliveryMethodHeader } from './DeliveryMethodStep/DeliveryMethodHeader'
import { DeliveryMethodList } from './DeliveryMethodStep/DeliveryMethodList'
import { DeliveryMethodErrors } from './DeliveryMethodStep/DeliveryMethodErrors'

interface DeliveryMethodStepProps {
  recipientCountry: string
  deliveryMethod: string
  setDeliveryMethod: (method: string) => void
  errors: FormErrors
  validateField?: (field: keyof FormErrors, value: string, rules?: any) => boolean
}

export function DeliveryMethodStep({
  recipientCountry,
  deliveryMethod,
  setDeliveryMethod,
  errors,
  validateField
}: DeliveryMethodStepProps) {
  const handleMethodSelection = (method: string) => {
    setDeliveryMethod(method)
    if (validateField) {
      validateField('deliveryMethod', method, { required: true })
    }
  }

  return (
    <RemittanceErrorBoundary step="How They'll Get It">
      <div className="space-y-8 animate-fade-in">
        <DeliveryMethodHeader />
        
        <DeliveryMethodList
          recipientCountry={recipientCountry}
          deliveryMethod={deliveryMethod}
          onMethodSelect={handleMethodSelection}
        />
        
        <DeliveryMethodErrors errors={errors} />
      </div>
    </RemittanceErrorBoundary>
  )
}
