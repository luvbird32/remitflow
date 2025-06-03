
import { ReactNode } from 'react'
import { ArrowDown } from "lucide-react"

interface StepContainerProps {
  children: ReactNode
  showArrow?: boolean
  isHighlighted?: boolean
}

export function StepContainer({ children, showArrow = false, isHighlighted = false }: StepContainerProps) {
  const containerClass = isHighlighted 
    ? "modern-card p-6 border-2 border-coral-200 bg-gradient-to-r from-coral-50 to-orange-50"
    : "modern-card p-6"

  return (
    <>
      {showArrow && (
        <div className="flex items-center justify-center">
          <ArrowDown className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <div className={containerClass}>
        {children}
      </div>
    </>
  )
}
