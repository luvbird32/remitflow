import { getSecurityConfig } from '@/config/security'

export interface AuditEvent {
  type: 'transfer_created' | 'transfer_completed' | 'auth_attempt' | 'validation_error'
  userId?: string
  details: Record<string, any>
  timestamp: string
  ip?: string
}

export class AuditLogger {
  private static config = getSecurityConfig()

  static log(event: AuditEvent): void {
    if (!this.config.enableAuditLogging) {
      return
    }

    // In a real deployment, this would send to a logging service
    // For open source, we'll just console.log with a clear format
    console.log(`[AUDIT] ${event.type.toUpperCase()} - ${event.timestamp}`, {
      userId: event.userId || 'anonymous',
      details: event.details,
      ip: event.ip || 'unknown'
    })

    // Store in localStorage for demo purposes
    // In production, this should go to a proper logging service
    try {
      const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]')
      existingLogs.push(event)
      
      // Keep only last 100 entries to prevent storage bloat
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100)
      }
      
      localStorage.setItem('audit_logs', JSON.stringify(existingLogs))
    } catch (error) {
      console.warn('Failed to store audit log:', error)
    }
  }

  static logTransferCreated(transferData: any, userId?: string): void {
    this.log({
      type: 'transfer_created',
      userId,
      details: {
        amount: transferData.amount,
        fromCurrency: transferData.fromCurrency,
        toCurrency: transferData.toCurrency,
        recipientCountry: transferData.recipientCountry
      },
      timestamp: new Date().toISOString()
    })
  }

  static logValidationError(errors: string[], context: string): void {
    this.log({
      type: 'validation_error',
      details: { errors, context },
      timestamp: new Date().toISOString()
    })
  }
}
