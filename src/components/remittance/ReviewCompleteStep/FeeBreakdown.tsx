
import { TransferFormData } from '../types'
import { currencies, calculateFee } from '../transferUtils'

interface FeeBreakdownProps {
  formData: TransferFormData
}

export function FeeBreakdown({ formData }: FeeBreakdownProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  return (
    <div className="border-t border-slate-200 pt-4 space-y-3">
      <div className="flex justify-between text-slate-600">
        <span>Transfer amount</span>
        <span>{fromCurrencyData?.symbol}{formData.amount}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Transfer fee</span>
        <span>{fromCurrencyData?.symbol}{fee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg text-slate-800 border-t border-slate-200 pt-3">
        <span>Total amount</span>
        <span>{fromCurrencyData?.symbol}{totalAmount}</span>
      </div>
    </div>
  )
}
