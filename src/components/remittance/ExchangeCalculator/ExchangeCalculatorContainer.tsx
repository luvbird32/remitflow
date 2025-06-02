
import { Calculator, TrendingUp } from "lucide-react"
import { useExchangeCalculator } from '../hooks/useExchangeCalculator'
import { ExchangeCalculatorForm } from './ExchangeCalculatorForm'
import { ExchangeCalculatorResults } from './ExchangeCalculatorResults'

/**
 * Main exchange rate calculator component that provides real-time currency conversion.
 * 
 * This component serves as the primary interface for users to calculate currency
 * conversions using live exchange rates. It combines form inputs for amount and
 * currency selection with live conversion results and quick amount buttons.
 * 
 * Features:
 * - Real-time currency conversion
 * - Currency swapping functionality
 * - Quick amount selection buttons
 * - Loading states for API calls
 * - Comprehensive exchange rate display
 * 
 * @returns JSX element containing the complete exchange calculator interface
 */
export function ExchangeCalculatorContainer() {
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
    <div className="modern-card p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/25">
          <Calculator className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            Exchange Rate Calculator
          </h3>
          <p className="text-slate-600 font-medium">
            Calculate currency conversions with live exchange rates
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="modern-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-teal-600" />
            <span className="font-semibold text-slate-800">Live Exchange Rates</span>
          </div>
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
        </div>
        
        <ExchangeCalculatorResults
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          currencies={currencies}
          conversionResult={conversionResult}
          isLoading={isLoading}
          onQuickAmount={setAmount}
        />
      </div>
    </div>
  )
}
