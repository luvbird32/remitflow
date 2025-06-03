
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, User, CreditCard, Clock } from "lucide-react"
import { TransferFormData, ConversionResult } from '../types'
import { currencies, countries, calculateFee } from '../transferUtils'
import { useState, useEffect } from 'react'
import { ApiService } from '@/services/apiService'

/**
 * Props interface for the TransferSummaryCard component
 */
interface TransferSummaryCardProps {
  /** Current transfer form data to display */
  formData: TransferFormData
}

/**
 * Transfer summary card component that displays a comprehensive overview
 * of the transfer details before final submission.
 * 
 * This component shows:
 * - Transfer amount and currencies
 * - Recipient information
 * - Delivery method details
 * - Fee breakdown and total amount
 * 
 * @param props - Component props containing form data
 * @returns JSX element with transfer summary information
 */
export function TransferSummaryCard({ formData }: TransferSummaryCardProps) {
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const countryData = countries.find(c => c.code === formData.recipientCountry)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  // Calculate conversion using API
  useEffect(() => {
    const calculateConversion = async () => {
      if (formData.amount && parseFloat(formData.amount) > 0) {
        try {
          const result = await ApiService.convertCurrency({
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
          const fallbackAmount = (parseFloat(formData.amount) / fromRate) * toRate
          setConversionResult({
            convertedAmount: fallbackAmount.toFixed(2),
            rate: toRate / fromRate
          })
        }
      }
    }
    calculateConversion()
  }, [formData.amount, formData.fromCurrency, formData.toCurrency, fromCurrencyData?.rate, toCurrencyData?.rate])

  const convertedAmount = conversionResult?.convertedAmount || "0.00"

  return (
    <Card className="modern-card overflow-hidden">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Transfer Summary</h4>
        </div>

        {/* Amount Section */}
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

        {/* Recipient Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-slate-700">Recipient</span>
          </div>
          <div className="pl-6 space-y-2">
            <div className="font-semibold text-slate-800">{formData.recipientName}</div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-3 w-3" />
              <span>{countryData?.name}</span>
            </div>
          </div>
        </div>

        {/* Delivery Method Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-slate-700">Delivery Method</span>
          </div>
          <div className="pl-6">
            <div className="capitalize font-semibold text-slate-800">
              {formData.deliveryMethod === 'bank' && 'Bank Transfer'}
              {formData.deliveryMethod === 'card' && 'Debit Card'}
              {formData.deliveryMethod === 'wallet' && 'Mobile Wallet'}
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
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
      </CardContent>
    </Card>
  )
}
