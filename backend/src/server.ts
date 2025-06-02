
import express from 'express';
import cors from 'cors';
import { transferRoutes } from './routes/transfers';
import { exchangeRoutes } from './routes/exchange';
import { userRoutes } from './routes/users';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transfers', transferRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'RemitFlow API is running' });
});

app.listen(PORT, () => {
  console.log(`RemitFlow backend server running on port ${PORT}`);
});

export default app;
