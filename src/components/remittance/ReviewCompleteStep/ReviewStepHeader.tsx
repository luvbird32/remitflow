
interface ReviewStepHeaderProps {}

export function ReviewStepHeader({}: ReviewStepHeaderProps) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-teal-600">
      <div className="step-indicator">4</div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">Review & Complete Transfer</h3>
        <p className="text-sm text-slate-500 font-normal">Verify all details and complete your transfer</p>
      </div>
    </div>
  )
}
