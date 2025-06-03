interface CrashReport {
  type: 'component_error' | 'api_error' | 'network_error' | 'validation_error'
  message: string
  stack?: string
  context?: string
  timestamp: string
  userAgent: string
  url: string
  userId?: string
}

export class CrashReporter {
  private static reports: CrashReport[] = []

  static report(
    type: CrashReport['type'],
    error: Error | string,
    context?: string,
    userId?: string
  ) {
    const report: CrashReport = {
      type,
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId
    }

    this.reports.push(report)
    
    // Store in localStorage
    try {
      const existingReports = JSON.parse(localStorage.getItem('crash_reports') || '[]')
      existingReports.push(report)
      
      // Keep only last 100 reports
      if (existingReports.length > 100) {
        existingReports.splice(0, existingReports.length - 100)
      }
      
      localStorage.setItem('crash_reports', JSON.stringify(existingReports))
    } catch (e) {
      console.warn('Failed to store crash report:', e)
    }

    // Log to console
    console.error(`[CRASH REPORT - ${type}]:`, report)
  }

  static getReports(): CrashReport[] {
    try {
      const stored = localStorage.getItem('crash_reports')
      return stored ? JSON.parse(stored) : this.reports
    } catch (e) {
      return this.reports
    }
  }

  static clearReports() {
    this.reports = []
    localStorage.removeItem('crash_reports')
  }
}
