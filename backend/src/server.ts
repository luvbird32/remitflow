
import express from 'express';
import cors from 'cors';
import { transferRoutes } from './routes/transfers';
import { exchangeRoutes } from './routes/exchange';
import { userRoutes } from './routes/users';
import { countryRoutes } from './routes/countries';
import { currencyRoutes } from './routes/currencies';
import { trackingRoutes } from './routes/tracking';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transfers', transferRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/tracking', trackingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'RemitFlow API is running' });
});

app.listen(PORT, () => {
  console.log(`RemitFlow backend server running on port ${PORT}`);
});

export default app;
