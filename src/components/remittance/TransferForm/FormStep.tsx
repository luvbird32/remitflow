
import { ReactNode } from 'react'
import { StepIndicator } from './StepIndicator'
import { StepContainer } from './StepContainer'

interface FormStepProps {
  stepNumber: number
  title: string
  description: string
  children: ReactNode
  showArrow?: boolean
  isHighlighted?: boolean
  isVisible?: boolean
}

export function FormStep({ 
  stepNumber, 
  title, 
  description, 
  children, 
  showArrow = false,
  isHighlighted = false,
  isVisible = true 
}: FormStepProps) {
  if (!isVisible) return null

  return (
    <StepContainer showArrow={showArrow} isHighlighted={isHighlighted}>
      <StepIndicator 
        stepNumber={stepNumber}
        title={title}
        description={description}
      />
      {children}
    </StepContainer>
  )
}
