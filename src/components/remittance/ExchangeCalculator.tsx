
import { ExchangeCalculatorContainer } from './ExchangeCalculator/ExchangeCalculatorContainer'

/**
 * Main exchange calculator component entry point.
 * 
 * This component serves as a simple wrapper that delegates to the
 * ExchangeCalculatorContainer for the actual implementation. This pattern
 * allows for better code organization and maintainability.
 * 
 * @returns JSX element containing the complete exchange calculator
 */
export function ExchangeCalculator() {
  return <ExchangeCalculatorContainer />
}
