
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"
import { useExchangeCalculator } from './hooks/useExchangeCalculator'
import { ExchangeCalculatorForm } from './ExchangeCalculatorForm'
import { ExchangeCalculatorResults } from './ExchangeCalculatorResults'

export function ExchangeCalculator() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    conversionResult,
    isLoading,
    swapCurrencies
  } = useExchangeCalculator()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Exchange Rate Calculator
        </CardTitle>
        <CardDescription>
          Calculate currency conversions with live exchange rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ExchangeCalculatorForm
          amount={amount}
          setAmount={setAmount}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          currencies={currencies}
          onSwapCurrencies={swapCurrencies}
        />
        
        <ExchangeCalculatorResults
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          currencies={currencies}
          conversionResult={conversionResult}
          isLoading={isLoading}
          onQuickAmount={setAmount}
        />
      </CardContent>
    </Card>
  )
}
