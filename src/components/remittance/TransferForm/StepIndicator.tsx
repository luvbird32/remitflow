
interface StepIndicatorProps {
  /** Step number to display */
  stepNumber: number
  /** Main title of the step */
  title: string
  /** Descriptive text explaining the step */
  description: string
}

/**
 * Step indicator component with improved typography and accessibility
 * Displays current step information with clear visual hierarchy
 */
export function StepIndicator({ stepNumber, title, description }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-4 mb-8 content-spacing">
      {/* Step number with enhanced visibility */}
      <div className="step-indicator" aria-label={`Step ${stepNumber}`}>
        {stepNumber}
      </div>
      
      {/* Step content with improved typography */}
      <div className="flex-1">
        <h3 className="heading-tertiary text-slate-800 mb-1">
          {title}
        </h3>
        <p className="body-regular text-slate-600 font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
