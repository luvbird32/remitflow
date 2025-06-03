
import express from 'express';
import { CurrencyService } from '../services/currencyService';

const router = express.Router();

// Get all currencies
router.get('/', (req, res) => {
  res.json(CurrencyService.getAllCurrencies());
});

// Get currency by code
router.get('/:code', (req, res) => {
  const currency = CurrencyService.getCurrencyByCode(req.params.code);
  if (!currency) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  res.json(currency);
});

// Calculate exchange rate
router.get('/rate/:from/:to', (req, res) => {
  const { from, to } = req.params;
  const rate = CurrencyService.calculateExchangeRate(from, to);
  res.json({ from, to, rate });
});

export { router as currencyRoutes };
