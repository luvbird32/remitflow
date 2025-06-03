
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { TransferFormData, ConversionResult } from '../types'
import { useState, useEffect } from 'react'
import { ApiService } from '@/services/apiService'
import { AmountDisplay } from './AmountDisplay'
import { RecipientInfo } from './RecipientInfo'
import { DeliveryInfo } from './DeliveryInfo'
import { FeeBreakdown } from './FeeBreakdown'
import { currencies } from '../transferUtils'

interface TransferSummaryCardProps {
  formData: TransferFormData
}

export function TransferSummaryCard({ formData }: TransferSummaryCardProps) {
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)
  
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)

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

  return (
    <Card className="modern-card overflow-hidden">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Transfer Summary</h4>
        </div>

        <AmountDisplay formData={formData} conversionResult={conversionResult} />
        <RecipientInfo formData={formData} />
        <DeliveryInfo formData={formData} />
        <FeeBreakdown formData={formData} />
      </CardContent>
    </Card>
  )
}
