
import express from 'express';
import { ExchangeService } from '../services/exchangeService';

const router = express.Router();

// Convert currency
router.post('/convert', (req, res) => {
  try {
    const { amount, from, to } = req.body;
    
    if (!amount || !from || !to) {
      return res.status(400).json({ error: 'Missing required fields: amount, from, to' });
    }

    const result = ExchangeService.convertCurrency(amount, from, to);
    res.json(result);
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get exchange rates
router.get('/rates', (req, res) => {
  try {
    const rates = ExchangeService.getExchangeRates();
    res.json(rates);
  } catch (error) {
    console.error('Exchange rates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific exchange rate
router.get('/rate/:from/:to', (req, res) => {
  try {
    const { from, to } = req.params;
    const rate = ExchangeService.calculateExchangeRate(from, to);
    res.json({ from, to, rate });
  } catch (error) {
    console.error('Exchange rate calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as exchangeRoutes };
