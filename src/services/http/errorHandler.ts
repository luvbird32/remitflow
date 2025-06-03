
import { AxiosError } from 'axios'
import { CrashReporter } from '@/utils/crashReporter'

export enum ErrorType {
  NETWORK = 'network_error',
  TIMEOUT = 'timeout_error',
  CLIENT = 'client_error',
  SERVER = 'server_error',
  VALIDATION = 'validation_error',
  AUTHENTICATION = 'authentication_error',
  AUTHORIZATION = 'authorization_error'
}

export interface ClassifiedError {
  type: ErrorType
  message: string
  code?: string | number
  retryable: boolean
  userMessage: string
}

export class ErrorHandler {
  static classify(error: any): ClassifiedError {
    // Network connectivity issues
    if (!navigator.onLine) {
      return {
        type: ErrorType.NETWORK,
        message: 'No internet connection',
        retryable: true,
        userMessage: 'Please check your internet connection and try again.'
      }
    }

    // Axios errors
    if (error.isAxiosError) {
      const axiosError = error as AxiosError
      
      // Timeout errors
      if (axiosError.code === 'ECONNABORTED') {
        return {
          type: ErrorType.TIMEOUT,
          message: 'Request timeout',
          retryable: true,
          userMessage: 'The request took too long. Please try again.'
        }
      }

      // Network errors (no response)
      if (!axiosError.response) {
        return {
          type: ErrorType.NETWORK,
          message: 'Network error - no response',
          retryable: true,
          userMessage: 'Unable to connect to our servers. Please try again.'
        }
      }

      const status = axiosError.response.status

      // Authentication errors
      if (status === 401) {
        return {
          type: ErrorType.AUTHENTICATION,
          message: 'Authentication required',
          code: status,
          retryable: false,
          userMessage: 'Please log in to continue.'
        }
      }

      // Authorization errors
      if (status === 403) {
        return {
          type: ErrorType.AUTHORIZATION,
          message: 'Access forbidden',
          code: status,
          retryable: false,
          userMessage: 'You do not have permission to perform this action.'
        }
      }

      // Validation errors
      if (status === 422 || status === 400) {
        return {
          type: ErrorType.VALIDATION,
          message: 'Validation error',
          code: status,
          retryable: false,
          userMessage: 'Please check your input and try again.'
        }
      }

      // Client errors (4xx)
      if (status >= 400 && status < 500) {
        return {
          type: ErrorType.CLIENT,
          message: `Client error: ${status}`,
          code: status,
          retryable: false,
          userMessage: 'There was an issue with your request. Please try again.'
        }
      }

      // Server errors (5xx)
      if (status >= 500) {
        return {
          type: ErrorType.SERVER,
          message: `Server error: ${status}`,
          code: status,
          retryable: true,
          userMessage: 'Our servers are experiencing issues. Please try again in a moment.'
        }
      }
    }

    // Generic errors
    return {
      type: ErrorType.CLIENT,
      message: error.message || 'Unknown error',
      retryable: false,
      userMessage: 'An unexpected error occurred. Please try again.'
    }
  }

  static handle(error: any, context?: string): ClassifiedError {
    const classified = this.classify(error)
    
    // Report to crash reporter
    CrashReporter.report(classified.type as any, error, context)
    
    // Log to console
    console.error(`[ErrorHandler] ${classified.type}:`, {
      message: classified.message,
      context,
      retryable: classified.retryable,
      originalError: error
    })

    return classified
  }
}
