
import { ExchangeCalculatorResults as ExchangeCalculatorResultsComponent } from './ExchangeCalculator/ExchangeCalculatorResults'
import { Currency } from './utils/currencyUtils'

/**
 * Props interface for the ExchangeCalculatorResults component
 */
interface ExchangeCalculatorResultsProps {
  /** Amount being converted */
  amount: string
  /** Source currency code */
  fromCurrency: string
  /** Target currency code */
  toCurrency: string
  /** Available currencies data */
  currencies: Currency[]
  /** Conversion result from API */
  conversionResult: any
  /** Whether conversion is in progress */
  isLoading: boolean
  /** Function to set quick amount values */
  onQuickAmount: (amount: string) => void
}

/**
 * Exchange calculator results wrapper component.
 * 
 * This component serves as a wrapper that delegates to the actual
 * ExchangeCalculatorResults implementation for better code organization.
 * 
 * @param props - Component props containing result data and handlers
 * @returns JSX element with conversion results and quick actions
 */
export function ExchangeCalculatorResults(props: ExchangeCalculatorResultsProps) {
  return <ExchangeCalculatorResultsComponent {...props} />
}
