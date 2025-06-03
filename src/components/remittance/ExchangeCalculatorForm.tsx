
import { ExchangeCalculatorForm as ExchangeCalculatorFormComponent } from './ExchangeCalculator/ExchangeCalculatorForm'
import { Currency } from './utils/currencyUtils'

/**
 * Props interface for the ExchangeCalculatorForm component
 */
interface ExchangeCalculatorFormProps {
  /** Amount to convert */
  amount: string
  /** Function to update the amount */
  setAmount: (amount: string) => void
  /** Source currency code */
  fromCurrency: string
  /** Function to update the source currency */
  setFromCurrency: (currency: string) => void
  /** Target currency code */
  toCurrency: string
  /** Function to update the target currency */
  setToCurrency: (currency: string) => void
  /** Available currencies for selection */
  currencies: Currency[]
  /** Function to swap source and target currencies */
  onSwapCurrencies: () => void
}

/**
 * Exchange calculator form wrapper component.
 * 
 * This component serves as a wrapper that delegates to the actual
 * ExchangeCalculatorForm implementation for better code organization.
 * 
 * @param props - Component props containing form state and handlers
 * @returns JSX element with the calculator form inputs
 */
export function ExchangeCalculatorForm(props: ExchangeCalculatorFormProps) {
  return <ExchangeCalculatorFormComponent {...props} />
}
