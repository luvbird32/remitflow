
import { TransferFormContainer } from './TransferForm/TransferFormContainer'

/**
 * Main transfer form component entry point.
 * 
 * This component serves as a simple wrapper that delegates to the
 * TransferFormContainer for the actual implementation. This pattern
 * allows for better code organization and maintainability.
 * 
 * @returns JSX element containing the complete transfer form
 */
export function TransferForm() {
  return <TransferFormContainer />
}
