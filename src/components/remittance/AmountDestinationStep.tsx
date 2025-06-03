
import { useEffect } from 'react'
import { FormErrors } from './types'
import { AmountInput } from './AmountInput'
import { CountrySelect } from './CountrySelect'
import { RecipientNameInput } from './RecipientNameInput'
import { RemittanceErrorBoundary } from './ErrorBoundary'

interface AmountDestinationStepProps {
  amount: string
  setAmount: (amount: string) => void
  recipientName: string
  setRecipientName: (name: string) => void
  recipientCountry: string
  onCountryChange: (countryCode: string) => void
  fromCurrency: string
  setFromCurrency: (currency: string) => void
  errors: FormErrors
  validateField?: (field: keyof FormErrors, value: string, rules?: any) => boolean
}

export function AmountDestinationStep({
  amount,
  setAmount,
  recipientName,
  setRecipientName,
  recipientCountry,
  onCountryChange,
  fromCurrency,
  setFromCurrency,
  errors,
  validateField
}: AmountDestinationStepProps) {
  
  // Validate fields on change if validation function is provided
  useEffect(() => {
    if (validateField && amount) {
      validateField('amount', amount, {
        required: true,
        pattern: /^\d+(\.\d{1,2})?$/,
        custom: (value: string) => {
          const num = parseFloat(value)
          if (num <= 0) return 'Amount must be greater than 0'
          if (num > 50000) return 'Amount cannot exceed $50,000'
          return null
        }
      })
    }
  }, [amount, validateField])

  useEffect(() => {
    if (validateField && recipientName) {
      validateField('recipientName', recipientName, {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[a-zA-Z\s'-]+$/
      })
    }
  }, [recipientName, validateField])

  return (
    <RemittanceErrorBoundary step="Amount & Recipient">
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
          <div className="step-indicator">1</div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Send Money To</h3>
            <p className="text-sm text-slate-500 font-normal">How much and to whom are you sending money?</p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="modern-card p-6 animate-scale-in" style={{animationDelay: '0.1s'}}>
            <AmountInput
              amount={amount}
              setAmount={setAmount}
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              error={errors.amount}
            />
          </div>

          <div className="modern-card p-6 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <CountrySelect
              recipientCountry={recipientCountry}
              onCountryChange={onCountryChange}
              error={errors.recipientCountry}
            />
          </div>
        </div>

        <div className="modern-card p-6 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <RecipientNameInput
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            error={errors.recipientName}
          />
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm">{errors.general}</p>
          </div>
        )}
      </div>
    </RemittanceErrorBoundary>
  )
}
