
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'
import { FormErrors } from './types'

interface ReviewCompleteStepProps {
  amount: string
  recipientEmail: string
  setRecipientEmail: (email: string) => void
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
  isSubmitting: boolean
  errors: FormErrors
}

export function ReviewCompleteStep({
  amount,
  recipientEmail,
  setRecipientEmail,
  recipientCountry,
  deliveryMethod,
  fromCurrency,
  toCurrency,
  isSubmitting,
  errors
}: ReviewCompleteStepProps) {
  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)
  const selectedCountry = countries.find(c => c.code === recipientCountry)
  const convertedAmount = calculateConvertedAmount(amount, fromCurrency, toCurrency)
  const fee = calculateFee(amount, deliveryMethod)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
        Review & Complete
      </div>

      {/* Exchange Rate Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-700">
                {fromCurrencyData?.symbol}{amount}
              </div>
              <div className="text-sm text-blue-600">{fromCurrency}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-blue-500" />
            <div className="text-left">
              <div className="text-2xl font-bold text-green-700">
                {toCurrencyData?.symbol}{convertedAmount}
              </div>
              <div className="text-sm text-green-600">{toCurrency}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
            <div className="text-center">
              <div className="text-xs text-gray-500">Exchange Rate</div>
              <div className="font-medium">1 {fromCurrency} = {toCurrencyData?.rate} {toCurrency}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Transfer Fee</div>
              <div className="font-medium">${fee.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Delivery Time</div>
              <div className="font-medium">{deliveryTimeframes[deliveryMethod as keyof typeof deliveryTimeframes]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Method Confirmation */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <div>
            <div className="font-medium text-blue-900">
              {deliveryMethodLabels[deliveryMethod as keyof typeof deliveryMethodLabels]}
            </div>
            <div className="text-sm text-blue-600">
              to {selectedCountry?.flag} {selectedCountry?.name}
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {deliveryTimeframes[deliveryMethod as keyof typeof deliveryTimeframes]}
        </Badge>
      </div>

      {/* Recipient Email */}
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium mb-2">
          Recipient Email
        </label>
        <Input
          id="recipient"
          type="email"
          placeholder="recipient@example.com"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className={errors.recipientEmail ? "border-red-500" : ""}
        />
        {errors.recipientEmail && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.recipientEmail}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-base" 
        disabled={isSubmitting || !amount || !recipientEmail || !recipientCountry || !deliveryMethod}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing Transfer...
          </>
        ) : (
          <>
            Send {fromCurrencyData?.symbol}{amount} • {toCurrencyData?.symbol}{convertedAmount} arrives
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
