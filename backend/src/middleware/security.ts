
import { Request, Response, NextFunction } from 'express'

export interface SecurityConfig {
  enableAuth: boolean
  enableRateLimit: boolean
  enableInputValidation: boolean
  maxTransferAmount: number
  allowedOrigins: string[]
}

const securityConfig: SecurityConfig = {
  enableAuth: process.env.ENABLE_AUTH === 'true',
  enableRateLimit: process.env.ENABLE_RATE_LIMIT === 'true',
  enableInputValidation: true, // Always enabled for safety
  maxTransferAmount: Number(process.env.MAX_TRANSFER_AMOUNT) || 10000,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*']
}

// Rate limiting middleware (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  if (!securityConfig.enableRateLimit) {
    return next()
  }

  const clientId = req.ip || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  const clientData = rateLimitMap.get(clientId)
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs })
    return next()
  }

  if (clientData.count >= maxRequests) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    })
  }

  clientData.count++
  next()
}

// Input validation middleware
export const validateTransferInput = (req: Request, res: Response, next: NextFunction) => {
  if (!securityConfig.enableInputValidation) {
    return next()
  }

  const { amount, recipientName, recipientEmail } = req.body
  const errors: string[] = []

  // Validate amount
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) {
    errors.push('Amount must be a valid positive number')
  }
  if (numAmount > securityConfig.maxTransferAmount) {
    errors.push(`Amount cannot exceed ${securityConfig.maxTransferAmount}`)
  }

  // Validate recipient name
  if (!recipientName || recipientName.trim().length < 2) {
    errors.push('Recipient name must be at least 2 characters')
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (recipientEmail && !emailRegex.test(recipientEmail)) {
    errors.push('Please enter a valid email address')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Configure CORS based on allowed origins
  const origin = req.headers.origin
  if (securityConfig.allowedOrigins.includes('*') || 
      (origin && securityConfig.allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  
  next()
}

export { securityConfig }
