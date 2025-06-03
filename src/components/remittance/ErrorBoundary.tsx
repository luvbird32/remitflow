
import React from 'react'
import { ErrorBoundary as BaseErrorBoundary } from '@/components/error/ErrorBoundary'
import { FallbackUI } from '@/components/error/FallbackUI'
import { CrashReporter } from '@/utils/crashReporter'

interface RemittanceErrorBoundaryProps {
  children: React.ReactNode
  step?: string
}

export function RemittanceErrorBoundary({ children, step }: RemittanceErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    CrashReporter.report('component_error', error, `Remittance Form - ${step || 'Unknown Step'}`)
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <BaseErrorBoundary
      onError={handleError}
      fallback={
        <FallbackUI
          title="Transfer Form Error"
          description={`Something went wrong with the ${step || 'transfer form'}. Please try again.`}
          onRetry={handleRetry}
        />
      }
    >
      {children}
    </BaseErrorBoundary>
  )
}
