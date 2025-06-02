
import { ArrowDown } from "lucide-react"
import { AmountDestinationStep } from '../AmountDestinationStep'
import { DeliveryMethodStep } from '../DeliveryMethodStep'
import { ReviewCompleteStep } from '../ReviewCompleteStep'
import { TransferFormData, FormErrors } from '../types'

/**
 * Props interface for the TransferFormSteps component
 */
interface TransferFormStepsProps {
  /** Current form data containing all transfer information */
  formData: TransferFormData
  /** Function to update the complete form data */
  setFormData: (data: TransferFormData) => void
  /** Function to update partial form data */
  updateFormData: (updates: Partial<TransferFormData>) => void
  /** Callback when recipient country changes */
  onCountryChange: (countryCode: string) => void
  /** Current form validation errors */
  errors: FormErrors
  /** Whether the form is currently being submitted */
  isSubmitting: boolean
  /** Form submission handler */
  onSubmit: (e: React.FormEvent) => void
}

/**
 * Multi-step transfer form component that handles the progressive disclosure
 * of form sections based on user input completion.
 * 
 * The form reveals steps progressively:
 * 1. Amount and Destination (always visible)
 * 2. Delivery Method (visible after step 1 is complete)
 * 3. Review & Complete (visible after step 2 is complete)
 * 
 * @param props - Component props containing form data and handlers
 * @returns JSX element with the multi-step form structure
 */
export function TransferFormSteps({
  formData,
  setFormData,
  updateFormData,
  onCountryChange,
  errors,
  isSubmitting,
  onSubmit
}: TransferFormStepsProps) {
  // Determine which steps should be visible based on form completion
  const showStep2 = formData.amount && formData.recipientName && formData.recipientCountry
  const showStep3 = showStep2 && formData.deliveryMethod

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Step 1: Amount and Destination - Always visible */}
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

      {/* Step 2: Delivery Method - Shown after step 1 completion */}
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

      {/* Step 3: Review & Complete - Shown after step 2 completion */}
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

      {/* Global error display */}
      {errors.general && (
        <div className="text-red-500 text-sm text-center">
          {errors.general}
        </div>
      )}
    </form>
  )
}
