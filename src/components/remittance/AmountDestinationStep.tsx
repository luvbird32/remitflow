
import { FormErrors } from './types'
import { AmountInput } from './AmountInput'
import { CountrySelect } from './CountrySelect'
import { RecipientNameInput } from './RecipientNameInput'

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
  errors
}: AmountDestinationStepProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
        <div className="step-indicator">1</div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Amount & Recipient Details</h3>
          <p className="text-sm text-slate-500 font-normal">Enter the transfer amount and recipient information</p>
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
    </div>
  )
}
