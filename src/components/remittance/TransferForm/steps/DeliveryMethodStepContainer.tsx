
import { DeliveryMethodStep } from '../../DeliveryMethodStep'
import { FormErrors } from '../../types'
import { FormStep } from '../FormStep'

interface DeliveryMethodStepContainerProps {
  recipientCountry: string
  deliveryMethod: string
  setDeliveryMethod: (method: string) => void
  errors: FormErrors
}

export function DeliveryMethodStepContainer({
  recipientCountry,
  deliveryMethod,
  setDeliveryMethod,
  errors
}: DeliveryMethodStepContainerProps) {
  return (
    <FormStep
      stepNumber={2}
      title="Delivery Method"
      description="Choose how the recipient will receive the money"
      showArrow
      isVisible={true}
    >
      <DeliveryMethodStep
        recipientCountry={recipientCountry}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={(method) => {
          console.log('DeliveryMethodStepContainer: Setting delivery method to:', method)
          setDeliveryMethod(method)
        }}
        errors={errors}
      />
    </FormStep>
  )
}
