
import express from 'express';

/**
 * Middleware for adding unique request IDs to incoming requests
 * 
 * This middleware ensures every request has a unique identifier for:
 * - Request tracing and debugging
 * - Correlation across distributed systems
 * - Audit logging and monitoring
 * 
 * The request ID is either taken from the 'x-request-id' header
 * or generated automatically using timestamp and random string.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next middleware function
 */
export const requestIdMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  req.headers['x-request-id'] = requestId as string;
  res.setHeader('X-Request-ID', requestId);
  console.log(`[${requestId}] ${req.method} ${req.path}`);
  next();
};

/**
 * Middleware for measuring and logging response times
 * 
 * This middleware tracks the time taken to process each request
 * and adds the response time to both logs and response headers.
 * Useful for:
 * - Performance monitoring
 * - Identifying slow endpoints
 * - API analytics and optimization
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next middleware function
 */
export const responseTimeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.headers['x-request-id']}] Response time: ${duration}ms`);
    res.setHeader('X-Response-Time', `${duration}ms`);
  });
  
  next();
};

/**
 * Middleware factory for setting cache control headers
 * 
 * This middleware sets appropriate cache control headers based on:
 * - HTTP method (GET requests are cacheable, others are not)
 * - Configurable max-age for cache duration
 * - Security considerations for sensitive endpoints
 * 
 * @param maxAge - Maximum cache age in seconds (default: 300 = 5 minutes)
 * @returns Express middleware function
 */
export const cacheControlMiddleware = (maxAge: number = 300) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    } else {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    next();
  };
};

/**
 * Middleware for API versioning support
 * 
 * This middleware handles API versioning by:
 * - Reading version from 'api-version' header
 * - Defaulting to 'v1' if no version specified
 * - Adding version info to response headers
 * - Enabling version-specific routing and logic
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next middleware function
 */
export const apiVersionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const version = req.headers['api-version'] || 'v1';
  req.headers['api-version'] = version as string;
  res.setHeader('API-Version', version);
  next();
};

/**
 * Centralized error handling middleware
 * 
 * This middleware provides comprehensive error handling by:
 * - Logging errors with request correlation
 * - Mapping error types to appropriate HTTP status codes
 * - Sanitizing error responses for security
 * - Including debugging information in development mode
 * - Maintaining consistent error response format
 * 
 * @param err - Error object or any thrown value
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next middleware function
 */
export const errorHandlingMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const requestId = req.headers['x-request-id'];
  
  console.error(`[${requestId}] Error:`, err);
  
  let status = 500;
  let message = 'Internal server error';
  
  // Map error types to HTTP status codes
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation failed';
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = 'Unauthorized';
  } else if (err.name === 'ForbiddenError') {
    status = 403;
    message = 'Forbidden';
  } else if (err.name === 'NotFoundError') {
    status = 404;
    message = 'Not found';
  }
  
  // Construct error response
  const errorResponse = {
    error: {
      message,
      requestId,
      timestamp: new Date().toISOString(),
      // Include stack trace only in development for debugging
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };
  
  res.status(status).json(errorResponse);
};
