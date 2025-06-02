
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, MapPin } from "lucide-react"
import { currencies, countries } from './transferUtils'
import { FormErrors } from './types'

interface AmountDestinationStepProps {
  amount: string
  setAmount: (amount: string) => void
  recipientCountry: string
  onCountryChange: (countryCode: string) => void
  fromCurrency: string
  setFromCurrency: (currency: string) => void
  errors: FormErrors
}

export function AmountDestinationStep({
  amount,
  setAmount,
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
        Amount & Destination
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            You Send
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={errors.amount ? "border-red-500" : ""}
                step="0.01"
                min="0"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.amount}
                </p>
              )}
            </div>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipient Country */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Recipient Country
          </label>
          <Select value={recipientCountry} onValueChange={onCountryChange}>
            <SelectTrigger className={errors.recipientCountry ? "border-red-500" : ""}>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <span className="text-gray-500">({country.currency})</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.recipientCountry && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.recipientCountry}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
