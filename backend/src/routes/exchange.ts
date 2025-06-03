
import express from 'express';
import { CurrencyService } from '../services/currencyService';
import { CountryService } from '../services/countryService';

const router = express.Router();

// Get all currencies
router.get('/currencies', (req, res) => {
  res.json(CurrencyService.getAllCurrencies());
});

// Get all countries
router.get('/countries', (req, res) => {
  res.json(CountryService.getAllCountries());
});

// Get exchange rate between two currencies
router.get('/rate/:from/:to', (req, res) => {
  const { from, to } = req.params;
  
  const fromCurrency = CurrencyService.getCurrencyByCode(from);
  const toCurrency = CurrencyService.getCurrencyByCode(to);
  
  if (!fromCurrency || !toCurrency) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  
  const rate = CurrencyService.calculateExchangeRate(from, to);
  
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
  
  const fromCurrency = CurrencyService.getCurrencyByCode(from);
  const toCurrency = CurrencyService.getCurrencyByCode(to);
  
  if (!fromCurrency || !toCurrency) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  
  const rate = CurrencyService.calculateExchangeRate(from, to);
  const convertedAmount = CurrencyService.calculateConvertedAmount(amount, from, to);
  
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
