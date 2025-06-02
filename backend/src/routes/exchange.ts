
import express from 'express';
import { currencies, countries } from '../services/transferService';

const router = express.Router();

// Get all currencies
router.get('/currencies', (req, res) => {
  res.json(currencies);
});

// Get all countries
router.get('/countries', (req, res) => {
  res.json(countries);
});

// Get exchange rate between two currencies
router.get('/rate/:from/:to', (req, res) => {
  const { from, to } = req.params;
  
  const fromCurrency = currencies.find(c => c.code === from);
  const toCurrency = currencies.find(c => c.code === to);
  
  if (!fromCurrency || !toCurrency) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  
  const rate = toCurrency.rate / fromCurrency.rate;
  
  res.json({
    from,
    to,
    rate: parseFloat(rate.toFixed(6)),
    fromCurrency,
    toCurrency,
    lastUpdated: new Date().toISOString()
  });
});

// Convert amount between currencies
router.post('/convert', (req, res) => {
  const { amount, from, to } = req.body;
  
  if (!amount || !from || !to) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const fromCurrency = currencies.find(c => c.code === from);
  const toCurrency = currencies.find(c => c.code === to);
  
  if (!fromCurrency || !toCurrency) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  
  const rate = toCurrency.rate / fromCurrency.rate;
  const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
  
  res.json({
    originalAmount: amount,
    convertedAmount,
    from,
    to,
    rate: parseFloat(rate.toFixed(6)),
    timestamp: new Date().toISOString()
  });
});

export { router as exchangeRoutes };
