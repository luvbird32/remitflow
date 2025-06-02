
/**
 * Header component for the review and complete step of the transfer form.
 * Displays the step number, title, and description.
 * 
 * @returns JSX element with the step header
 */
export function ReviewStepHeader() {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
      <div className="step-indicator">3</div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">Review & Complete Transfer</h3>
        <p className="text-sm text-slate-500 font-normal">Verify your details and complete the payment</p>
      </div>
    </div>
  )
}
