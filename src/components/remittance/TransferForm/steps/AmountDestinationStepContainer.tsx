
import { AmountDestinationStep } from '../../AmountDestinationStep'
import { FormStep } from '../FormStep'
import { TransferFormData, FormErrors } from '../../types'

interface AmountDestinationStepContainerProps {
  formData: TransferFormData
  updateFormData: (updates: Partial<TransferFormData>) => void
  onCountryChange: (countryCode: string) => void
  errors: FormErrors
}

export function AmountDestinationStepContainer({
  formData,
  updateFormData,
  onCountryChange,
  errors
}: AmountDestinationStepContainerProps) {
  return (
    <FormStep
      stepNumber={1}
      title="Amount & Destination"
      description="Enter transfer amount and recipient details"
    >
      <AmountDestinationStep
        amount={formData.amount}
        setAmount={(amount) => updateFormData({ amount })}
        recipientName={formData.recipientName}
        setRecipientName={(name) => updateFormData({ recipientName: name })}
        recipientCountry={formData.recipientCountry}
        onCountryChange={onCountryChange}
        fromCurrency={formData.fromCurrency}
        setFromCurrency={(currency) => updateFormData({ fromCurrency: currency })}
        errors={errors}
      />
    </FormStep>
  )
}
