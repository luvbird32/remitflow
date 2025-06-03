
import { TransferFormData } from '../types'
import { currencies } from '../transferUtils'

interface FeeBreakdownProps {
  formData: TransferFormData
}

export function FeeBreakdown({ formData }: FeeBreakdownProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  
  // In production, these would be calculated by backend services:
  // - Fee calculation: backend/src/services/feeService.ts
  // - Currency conversion: backend/src/services/currencyService.ts
  
  // Fallback calculation for UI display
  const amount = parseFloat(formData.amount) || 0
  const fee = amount <= 100 ? 2.99 : amount <= 500 ? 4.99 : 7.99
  const totalAmount = (amount + fee).toFixed(2)

  return (
    <div className="border-t border-slate-200 pt-4 space-y-3">
      <div className="flex justify-between text-slate-600">
        <span>Amount</span>
        <span>{fromCurrencyData?.symbol}{formData.amount}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Fee</span>
        <span>{fromCurrencyData?.symbol}{fee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg text-slate-800 border-t border-slate-200 pt-3">
        <span>Total you pay</span>
        <span>{fromCurrencyData?.symbol}{totalAmount}</span>
      </div>
    </div>
  )
}
