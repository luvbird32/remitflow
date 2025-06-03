import { useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ErrorHandlerOptions {
  showToast?: boolean
  logToConsole?: boolean
  logToStorage?: boolean
}

export function useErrorHandler() {
  const { toast } = useToast()

  const handleError = useCallback((
    error: Error | string,
    context?: string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logToConsole = true,
      logToStorage = true
    } = options

    const errorMessage = typeof error === 'string' ? error : error.message
    const errorStack = typeof error === 'string' ? undefined : error.stack

    // Log to console
    if (logToConsole) {
      console.error(`[Error${context ? ` - ${context}` : ''}]:`, errorMessage, errorStack)
    }

    // Show toast notification
    if (showToast) {
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
    }

    // Store in localStorage for debugging
    if (logToStorage) {
      try {
        const errorData = {
          message: errorMessage,
          stack: errorStack,
          context,
          timestamp: new Date().toISOString(),
          url: window.location.href
        }
        
        const existingErrors = JSON.parse(localStorage.getItem('error_log') || '[]')
        existingErrors.push(errorData)
        
        // Keep only last 50 errors
        if (existingErrors.length > 50) {
          existingErrors.splice(0, existingErrors.length - 50)
        }
        
        localStorage.setItem('error_log', JSON.stringify(existingErrors))
      } catch (e) {
        console.warn('Failed to store error in localStorage:', e)
      }
    }
  }, [toast])

  const handleAsyncError = useCallback(async (
    asyncFn: () => Promise<any>,
    context?: string,
    options?: ErrorHandlerOptions
  ) => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error, context, options)
      throw error // Re-throw so caller can handle if needed
    }
  }, [handleError])

  return { handleError, handleAsyncError }
}
