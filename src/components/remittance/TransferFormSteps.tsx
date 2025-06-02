
import { ArrowDown } from "lucide-react"
import { AmountDestinationStep } from './AmountDestinationStep'
import { DeliveryMethodStep } from './DeliveryMethodStep'
import { ReviewCompleteStep } from './ReviewCompleteStep'
import { TransferFormData, FormErrors } from './types'

interface TransferFormStepsProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  updateFormData: (updates: Partial<TransferFormData>) => void
  onCountryChange: (countryCode: string) => void
  errors: FormErrors
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function TransferFormSteps({
  formData,
  setFormData,
  updateFormData,
  onCountryChange,
  errors,
  isSubmitting,
  onSubmit
}: TransferFormStepsProps) {
  const showStep2 = formData.amount && formData.recipientName && formData.recipientCountry
  const showStep3 = showStep2 && formData.deliveryMethod

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Step 1: Amount and Destination */}
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

      {/* Step 2: Delivery Method */}
      {showStep2 && (
        <>
          <div className="flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <DeliveryMethodStep
            recipientCountry={formData.recipientCountry}
            deliveryMethod={formData.deliveryMethod}
            setDeliveryMethod={(method) => updateFormData({ deliveryMethod: method })}
            errors={errors}
          />
        </>
      )}

      {/* Step 3: Review & Complete */}
      {showStep3 && (
        <>
          <div className="flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <ReviewCompleteStep
            formData={formData}
            setFormData={updateFormData}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        </>
      )}

      {errors.general && (
        <div className="text-red-500 text-sm text-center">
          {errors.general}
        </div>
      )}
    </form>
  )
}
