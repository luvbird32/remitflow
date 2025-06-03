
// Security configuration for open-source deployment
export interface SecurityConfig {
  enableAuth: boolean
  enableRateLimit: boolean
  enableInputValidation: boolean
  enableAuditLogging: boolean
  maxTransferAmount: number
  allowedOrigins: string[]
}

export const defaultSecurityConfig: SecurityConfig = {
  enableAuth: import.meta.env.VITE_ENABLE_AUTH === 'true',
  enableRateLimit: import.meta.env.VITE_ENABLE_RATE_LIMIT === 'true',
  enableInputValidation: true, // Always enabled for safety
  enableAuditLogging: import.meta.env.VITE_ENABLE_AUDIT_LOG === 'true',
  maxTransferAmount: Number(import.meta.env.VITE_MAX_TRANSFER_AMOUNT) || 10000,
  allowedOrigins: import.meta.env.VITE_ALLOWED_ORIGINS?.split(',') || ['*']
}

export const getSecurityConfig = (): SecurityConfig => {
  return {
    ...defaultSecurityConfig,
    // Override with any runtime configuration if needed
  }
}
