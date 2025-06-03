import { useState, useEffect } from 'react'
import { TransferFormData, ConversionResult } from './types'
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateFee } from './transferUtils'
import { ExchangeApiService } from '@/services/exchangeApiService'
import { ArrowRight, Clock, CreditCard, Globe, DollarSign } from 'lucide-react'

interface TransferSummaryProps {
  formData: TransferFormData
}

export function TransferSummary({ formData }: TransferSummaryProps) {
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  // Calculate conversion using API
  useEffect(() => {
    const calculateConversion = async () => {
      if (formData.amount && parseFloat(formData.amount) > 0) {
        try {
          const result = await ExchangeApiService.convertCurrency({
            amount: formData.amount,
            from: formData.fromCurrency,
            to: formData.toCurrency
          })
          setConversionResult(result)
        } catch (error) {
          console.error('Conversion error:', error)
          // Fallback to local calculation
          const fromRate = fromCurrencyData?.rate || 1
          const toRate = toCurrencyData?.rate || 1
          const rate = toRate / fromRate
          const fallbackAmount = (parseFloat(formData.amount) * rate).toFixed(2)
          setConversionResult({
            convertedAmount: fallbackAmount,
            rate: rate
          })
        }
      }
    }
    calculateConversion()
  }, [formData.amount, formData.fromCurrency, formData.toCurrency, fromCurrencyData?.rate, toCurrencyData?.rate])

  const convertedAmount = conversionResult?.convertedAmount || "0.00"
  const exchangeRate = conversionResult?.rate || 0

  return (
    <div className="space-y-6">
      {/* Transfer Summary */}
      <div className="modern-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Transfer Summary</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-teal-100">
            <span className="text-slate-600 font-medium">You send:</span>
            <span className="text-xl font-bold text-slate-800">{fromCurrencyData?.symbol}{formData.amount} {formData.fromCurrency}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-teal-100">
            <span className="text-slate-600 font-medium">Transfer fee:</span>
            <span className="text-lg font-semibold text-amber-600">${fee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-slate-700 font-semibold">Total amount:</span>
            <span className="text-xl font-bold text-slate-800">{fromCurrencyData?.symbol}{totalAmount}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-teal-100">
            <span className="text-slate-600 font-medium">Exchange rate:</span>
            <span className="font-semibold text-slate-800">1 {formData.fromCurrency} = {exchangeRate.toFixed(6)} {formData.toCurrency}</span>
          </div>
          <div className="flex items-center justify-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-lg font-semibold text-emerald-700">{formData.recipientName} receives:</span>
                <ArrowRight className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-emerald-600">{toCurrencyData?.symbol}{convertedAmount} {formData.toCurrency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="modern-card p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Recipient Details</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Name:</span>
            <span className="font-semibold text-slate-800">{formData.recipientName}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Country:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-lg">{selectedCountry?.flag}</span>
              {selectedCountry?.name}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/80 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Delivery method:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-coral-50 to-orange-50 rounded-xl border border-coral-200">
            <span className="text-coral-700 font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Estimated delivery:
            </span>
            <span className="font-bold text-coral-600">{deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
