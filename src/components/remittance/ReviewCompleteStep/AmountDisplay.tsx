
import { TransferFormData, ConversionResult } from '../../types'
import { currencies } from '../../transferUtils'

interface AmountDisplayProps {
  formData: TransferFormData
  conversionResult: ConversionResult | null
}

export function AmountDisplay({ formData, conversionResult }: AmountDisplayProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const convertedAmount = conversionResult?.convertedAmount || "0.00"

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
        <span className="font-medium text-slate-700">You send</span>
        <span className="text-xl font-bold text-teal-600">
          {fromCurrencyData?.symbol}{formData.amount} {formData.fromCurrency}
        </span>
      </div>
      
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-coral-50 to-orange-50 rounded-xl border border-coral-200">
        <span className="font-medium text-slate-700">They receive</span>
        <span className="text-xl font-bold text-coral-600">
          {toCurrencyData?.symbol}{convertedAmount} {formData.toCurrency}
        </span>
      </div>
    </div>
  )
}
