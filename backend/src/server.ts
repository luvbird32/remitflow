
import express from 'express';
import cors from 'cors';
import { transferRoutes } from './routes/transfers';
import { exchangeRoutes } from './routes/exchange';
import { userRoutes } from './routes/users';
import { countryRoutes } from './routes/countries';
import { currencyRoutes } from './routes/currencies';
import { trackingRoutes } from './routes/tracking';
import { rateLimit, securityHeaders } from './middleware/security';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(securityHeaders);
app.use(rateLimit);

// CORS middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/transfers', transferRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RemitFlow API is running',
    security: {
      authEnabled: process.env.ENABLE_AUTH === 'true',
      rateLimitEnabled: process.env.ENABLE_RATE_LIMIT === 'true',
      inputValidationEnabled: true
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  
  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`RemitFlow backend server running on port ${PORT}`);
  console.log(`Security features: AUTH=${process.env.ENABLE_AUTH}, RATE_LIMIT=${process.env.ENABLE_RATE_LIMIT}`);
});

export default app;
