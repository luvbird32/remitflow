
import { useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ErrorHandler, ErrorType } from '@/services/http/errorHandler'
import { CrashReporter } from '@/utils/crashReporter'

export function useApiErrorHandling() {
  const { toast } = useToast()

  const handleApiError = useCallback((error: any, operation: string) => {
    const classified = ErrorHandler.classify(error)
    
    // Report to crash reporter
    CrashReporter.report('api_error', error, operation)
    
    // Show appropriate user message
    toast({
      title: 'Error',
      description: classified.userMessage,
      variant: 'destructive'
    })

    // Return whether the operation should be retried
    return classified.retryable
  }, [toast])

  const handleNetworkError = useCallback((error: any, operation: string) => {
    const classified = ErrorHandler.classify(error)
    
    if (classified.type === ErrorType.NETWORK) {
      toast({
        title: 'Connection Issue',
        description: 'Please check your internet connection and try again.',
        variant: 'destructive'
      })
    }
    
    return classified.retryable
  }, [toast])

  const handleValidationError = useCallback((error: any, operation: string) => {
    const classified = ErrorHandler.classify(error)
    
    if (classified.type === ErrorType.VALIDATION) {
      toast({
        title: 'Validation Error',
        description: 'Please check your input and try again.',
        variant: 'destructive'
      })
    }
    
    return false // Validation errors are not retryable
  }, [toast])

  return {
    handleApiError,
    handleNetworkError,
    handleValidationError
  }
}
