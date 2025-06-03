
import express from 'express';
import cors from 'cors';
import { transferRoutes } from './routes/transfers';
import { exchangeRoutes } from './routes/exchange';
import { userRoutes } from './routes/users';
import { countryRoutes } from './routes/countries';
import { currencyRoutes } from './routes/currencies';
import { trackingRoutes } from './routes/tracking';
import { externalRoutes } from './routes/external';
import { rateLimit, securityHeaders } from './middleware/security';
import { 
  requestIdMiddleware, 
  responseTimeMiddleware, 
  cacheControlMiddleware, 
  apiVersionMiddleware,
  errorHandlingMiddleware 
} from './middleware/httpEnhancements';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(securityHeaders);
app.use(rateLimit);

// HTTP enhancement middleware
app.use(requestIdMiddleware);
app.use(responseTimeMiddleware);
app.use(apiVersionMiddleware);

// CORS middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cache control for static routes
app.use('/api/currencies', cacheControlMiddleware(600)); // 10 minutes
app.use('/api/countries', cacheControlMiddleware(3600)); // 1 hour

// Routes
app.use('/api/transfers', transferRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/external', externalRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RemitFlow API is running',
    version: process.env.API_VERSION || 'v1',
    timestamp: new Date().toISOString(),
    security: {
      authEnabled: process.env.ENABLE_AUTH === 'true',
      rateLimitEnabled: process.env.ENABLE_RATE_LIMIT === 'true',
      inputValidationEnabled: true
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`RemitFlow backend server running on port ${PORT}`);
  console.log(`Security features: AUTH=${process.env.ENABLE_AUTH}, RATE_LIMIT=${process.env.ENABLE_RATE_LIMIT}`);
  console.log(`API Version: ${process.env.API_VERSION || 'v1'}`);
});

export default app;
