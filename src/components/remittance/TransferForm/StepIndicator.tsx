
interface StepIndicatorProps {
  stepNumber: number
  title: string
  description: string
}

export function StepIndicator({ stepNumber, title, description }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3 mb-6 text-sm font-semibold text-teal-600">
      <div className="step-indicator">{stepNumber}</div>
      <div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 font-normal">{description}</p>
      </div>
    </div>
  )
}
