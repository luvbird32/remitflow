
import { Button } from "@/components/ui/button"
import { Currency } from './transferUtils'

interface ExchangeCalculatorResultsProps {
  amount: string
  fromCurrency: string
  toCurrency: string
  currencies: Currency[]
  conversionResult: any
  isLoading: boolean
  onQuickAmount: (amount: string) => void
}

export function ExchangeCalculatorResults({
  amount,
  fromCurrency,
  toCurrency,
  currencies,
  conversionResult,
  isLoading,
  onQuickAmount
}: ExchangeCalculatorResultsProps) {
  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)

  return (
    <div className="space-y-6">
      {/* Results */}
      {(conversionResult || isLoading) && (
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">Calculating...</div>
              </div>
            </div>
          ) : conversionResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-center space-y-2">
                <div className="text-sm text-gray-600">
                  {fromCurrencyData?.symbol}{amount} {fromCurrency} =
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {toCurrencyData?.symbol}{conversionResult.convertedAmount} {toCurrency}
                </div>
                <div className="text-xs text-gray-500">
                  1 {fromCurrency} = {conversionResult.rate} {toCurrency}
                </div>
              </div>
            </div>
          )}

          {conversionResult && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium">You send</div>
                <div className="text-blue-600">{fromCurrencyData?.symbol}{amount} {fromCurrency}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium">They receive</div>
                <div className="text-green-600">{toCurrencyData?.symbol}{conversionResult.convertedAmount} {toCurrency}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick conversion buttons */}
      <div className="space-y-2">
        <div className="text-sm font-medium">Quick amounts</div>
        <div className="flex flex-wrap gap-2">
          {["100", "500", "1000", "5000"].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => onQuickAmount(quickAmount)}
              className="text-xs"
            >
              {fromCurrencyData?.symbol}{quickAmount}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
