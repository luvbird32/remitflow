
import { ArrowDown } from "lucide-react"
import { AmountDestinationStep } from '../AmountDestinationStep'
import { DeliveryMethodStep } from '../DeliveryMethodStep'
import { ReviewCompleteStep } from '../ReviewCompleteStep'
import { PaymentMethodFields } from '../PaymentMethodFields'
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
 * 3. Payment Details (visible after step 2 is complete)
 * 4. Review & Complete (visible after step 3 is complete)
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
  
  // Check if payment details are filled based on delivery method
  const hasPaymentDetails = () => {
    switch (formData.deliveryMethod) {
      case 'bank':
        return formData.bankName && formData.accountNumber
      case 'card':
        return formData.cardNumber && formData.cardIssuer
      case 'wallet':
        return formData.mobileNumber && formData.mobileProvider
      default:
        return false
    }
  }
  
  const showStep4 = showStep3 && hasPaymentDetails()

  console.log('Form state:', {
    amount: formData.amount,
    recipientName: formData.recipientName,
    recipientCountry: formData.recipientCountry,
    deliveryMethod: formData.deliveryMethod,
    hasPaymentDetails: hasPaymentDetails(),
    showStep2,
    showStep3,
    showStep4
  })

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Step 1: Amount and Destination - Always visible */}
      <div className="modern-card p-6">
        <div className="flex items-center gap-3 mb-6 text-sm font-semibold text-teal-600">
          <div className="step-indicator">1</div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Amount & Destination</h3>
            <p className="text-sm text-slate-500 font-normal">Enter transfer amount and recipient details</p>
          </div>
        </div>
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
      </div>

      {/* Step 2: Delivery Method - Shown after step 1 completion */}
      {showStep2 && (
        <>
          <div className="flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6 text-sm font-semibold text-teal-600">
              <div className="step-indicator">2</div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Delivery Method</h3>
                <p className="text-sm text-slate-500 font-normal">Choose how the recipient will receive the money</p>
              </div>
            </div>
            <DeliveryMethodStep
              recipientCountry={formData.recipientCountry}
              deliveryMethod={formData.deliveryMethod}
              setDeliveryMethod={(method) => updateFormData({ deliveryMethod: method })}
              errors={errors}
            />
          </div>
        </>
      )}

      {/* Step 3: Payment Details - Shown after step 2 completion */}
      {showStep3 && (
        <>
          <div className="flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="modern-card p-6">
            <div className="flex items-center gap-3 mb-6 text-sm font-semibold text-teal-600">
              <div className="step-indicator">3</div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Payment Details</h3>
                <p className="text-sm text-slate-500 font-normal">Enter your payment information</p>
              </div>
            </div>
            <PaymentMethodFields
              formData={formData}
              onFieldChange={(field, value) => updateFormData({ [field]: value })}
              errors={errors}
            />
          </div>
        </>
      )}

      {/* Step 4: Review & Complete - Shown after step 3 completion */}
      {showStep4 && (
        <>
          <div className="flex items-center justify-center">
            <ArrowDown className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="modern-card p-6 border-2 border-coral-200 bg-gradient-to-r from-coral-50 to-orange-50">
            <div className="flex items-center gap-3 mb-6 text-sm font-semibold text-teal-600">
              <div className="step-indicator">4</div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Review & Complete Transfer</h3>
                <p className="text-sm text-slate-500 font-normal">Verify all details and complete your transfer</p>
              </div>
            </div>
            <ReviewCompleteStep
              formData={formData}
              setFormData={setFormData}
              isSubmitting={isSubmitting}
              errors={errors}
            />
          </div>
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
