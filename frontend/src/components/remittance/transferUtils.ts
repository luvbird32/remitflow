
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currencies: string[];
}

export const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 150 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 460 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', rate: 12 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', rate: 3700 },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', rate: 2300 },
];

export const countries: Country[] = [
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currencies: ['KES', 'USD'] },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currencies: ['NGN', 'USD'] },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currencies: ['GHS', 'USD'] },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', currencies: ['UGX', 'USD'] },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currencies: ['TZS', 'USD'] },
  { code: 'US', name: 'United States', flag: '🇺🇸', currencies: ['USD'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencies: ['GBP'] },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currencies: ['EUR'] },
];

export const deliveryMethodLabels = {
  bank: 'Bank Transfer',
  card: 'Debit Card',
  mobile: 'Mobile Money'
};

export const deliveryTimeframes = {
  bank: '1-3 days',
  card: 'Instant',
  mobile: 'Few minutes'
};

export function calculateConvertedAmount(amount: string, fromCurrency: string, toCurrency: string): string {
  const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
  const usdAmount = parseFloat(amount) / fromRate;
  const convertedAmount = usdAmount * toRate;
  return convertedAmount.toFixed(2);
}

export function calculateFee(amount: string, deliveryMethod: string): number {
  const baseAmount = parseFloat(amount) || 0;
  const feeRate = deliveryMethod === 'card' ? 0.02 : deliveryMethod === 'mobile' ? 0.01 : 0.005;
  return Math.max(baseAmount * feeRate, 2.99);
}
