
import express from 'express';

// Request ID middleware
export const requestIdMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  req.headers['x-request-id'] = requestId as string;
  res.setHeader('X-Request-ID', requestId);
  console.log(`[${requestId}] ${req.method} ${req.path}`);
  next();
};

// Response time middleware
export const responseTimeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.headers['x-request-id']}] Response time: ${duration}ms`);
    res.setHeader('X-Response-Time', `${duration}ms`);
  });
  
  next();
};

// Cache control middleware
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

// API versioning middleware
export const apiVersionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const version = req.headers['api-version'] || 'v1';
  req.headers['api-version'] = version as string;
  res.setHeader('API-Version', version);
  next();
};

// Error handling middleware
export const errorHandlingMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const requestId = req.headers['x-request-id'];
  
  console.error(`[${requestId}] Error:`, err);
  
  let status = 500;
  let message = 'Internal server error';
  
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
  
  res.status(status).json({
    error: {
      message,
      requestId,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
