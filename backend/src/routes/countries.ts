
import express from 'express';
import { CountryService } from '../services/countryService';
import { DeliveryService } from '../services/deliveryService';

const router = express.Router();

// Get all countries
router.get('/', (req, res) => {
  res.json(CountryService.getAllCountries());
});

// Get country by code
router.get('/:code', (req, res) => {
  const country = CountryService.getCountryByCode(req.params.code);
  if (!country) {
    return res.status(404).json({ error: 'Country not found' });
  }
  res.json(country);
});

// Get delivery methods for a country
router.get('/:code/delivery-methods', (req, res) => {
  const deliveryMethods = DeliveryService.getDeliveryMethods(req.params.code);
  res.json(deliveryMethods);
});

export { router as countryRoutes };
