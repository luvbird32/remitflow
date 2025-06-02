
import { TransferSummary } from '../TransferSummary'
import { TransferFormData } from '../types'

/**
 * Props interface for the TransferSummaryCard component
 */
interface TransferSummaryCardProps {
  /** Transfer form data to display in the summary */
  formData: TransferFormData
}

/**
 * Card component that wraps the transfer summary with appropriate styling.
 * Provides a clean, contained display of the transfer details.
 * 
 * @param props - Component props containing form data
 * @returns JSX element with the styled transfer summary card
 */
export function TransferSummaryCard({ formData }: TransferSummaryCardProps) {
  return (
    <div className="modern-card p-8 animate-scale-in">
      <TransferSummary formData={formData} />
    </div>
  )
}
