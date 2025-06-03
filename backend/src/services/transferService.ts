
import { Currency, Country, TransferRequest, ValidationError } from '../types/transfer';
import { CurrencyService } from './currencyService';
import { CountryService } from './countryService';
import { DeliveryService } from './deliveryService';
import { FeeService } from './feeService';
import { ValidationService } from './validationService';

// Re-export for backward compatibility
export const currencies = CurrencyService.getAllCurrencies();
export const countries = CountryService.getAllCountries();

export class TransferService {
  static calculateConvertedAmount(amount: string, fromCurrency: string, toCurrency: string): string {
    return CurrencyService.calculateConvertedAmount(amount, fromCurrency, toCurrency);
  }

  static calculateFee(amount: string, deliveryMethod: string): number {
    return FeeService.calculateTotalFee(amount, deliveryMethod);
  }

  static validateTransfer(transfer: TransferRequest): ValidationError[] {
    return ValidationService.validateTransfer(transfer);
  }

  static getEstimatedDelivery(deliveryMethod: string): string {
    return DeliveryService.getEstimatedDelivery(deliveryMethod);
  }

  static generateTransferId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
}
