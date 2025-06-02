
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
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
        Amount & Recipient
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          error={errors.amount}
        />

        <CountrySelect
          recipientCountry={recipientCountry}
          onCountryChange={onCountryChange}
          error={errors.recipientCountry}
        />
      </div>

      <RecipientNameInput
        recipientName={recipientName}
        setRecipientName={setRecipientName}
        error={errors.recipientName}
      />
    </div>
  )
}
