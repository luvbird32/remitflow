
import { CurrencyService } from './currencyService';

export interface ConversionResult {
  convertedAmount: string;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
}

export class ExchangeService {
  static convertCurrency(amount: string, fromCurrency: string, toCurrency: string): ConversionResult {
    if (!amount || parseFloat(amount) <= 0) {
      return {
        convertedAmount: "0.00",
        rate: 0,
        fromCurrency,
        toCurrency
      };
    }

    const rate = CurrencyService.calculateExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = CurrencyService.calculateConvertedAmount(amount, fromCurrency, toCurrency);

    return {
      convertedAmount,
      rate,
      fromCurrency,
      toCurrency
    };
  }

  static calculateExchangeRate(fromCurrency: string, toCurrency: string): number {
    return CurrencyService.calculateExchangeRate(fromCurrency, toCurrency);
  }

  static getExchangeRates(): { from: string; to: string; rate: number }[] {
    const currencies = CurrencyService.getAllCurrencies();
    const rates: { from: string; to: string; rate: number }[] = [];

    currencies.forEach(fromCurrency => {
      currencies.forEach(toCurrency => {
        if (fromCurrency.code !== toCurrency.code) {
          const rate = this.calculateExchangeRate(fromCurrency.code, toCurrency.code);
          rates.push({
            from: fromCurrency.code,
            to: toCurrency.code,
            rate
          });
        }
      });
    });

    return rates;
  }
}
