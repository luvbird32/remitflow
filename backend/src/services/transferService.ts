
import { Currency, Country, TransferRequest, ValidationError } from '../types/transfer';
import { CurrencyService } from './currencyService';
import { CountryService } from './countryService';
import { DeliveryService } from './deliveryService';
import { FeeService } from './feeService';

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
    const errors: ValidationError[] = [];
    
    if (!transfer.amount || parseFloat(transfer.amount) <= 0) {
      errors.push({ field: "amount", message: "Please enter a valid amount" });
    } else if (parseFloat(transfer.amount) < 1) {
      errors.push({ field: "amount", message: "Minimum transfer amount is $1" });
    } else if (parseFloat(transfer.amount) > 10000) {
      errors.push({ field: "amount", message: "Maximum transfer amount is $10,000" });
    }

    if (!transfer.recipientName.trim()) {
      errors.push({ field: "recipientName", message: "Recipient name is required" });
    }

    if (!transfer.recipientCountry) {
      errors.push({ field: "recipientCountry", message: "Please select recipient country" });
    }

    if (!transfer.deliveryMethod) {
      errors.push({ field: "deliveryMethod", message: "Please select delivery method" });
    }

    // Validate based on delivery method
    if (transfer.deliveryMethod === 'bank') {
      if (!transfer.accountNumber) {
        errors.push({ field: "accountNumber", message: "Account number is required" });
      }
      if (!transfer.bankName) {
        errors.push({ field: "bankName", message: "Bank name is required" });
      }
    } else if (transfer.deliveryMethod === 'card') {
      if (!transfer.cardNumber) {
        errors.push({ field: "cardNumber", message: "Card number is required" });
      } else if (!/^\d{16}$/.test(transfer.cardNumber.replace(/\s/g, ''))) {
        errors.push({ field: "cardNumber", message: "Please enter a valid 16-digit card number" });
      }
      if (!transfer.cardIssuer) {
        errors.push({ field: "cardIssuer", message: "Card issuer is required" });
      }
    } else if (transfer.deliveryMethod === 'wallet') {
      if (!transfer.mobileNumber) {
        errors.push({ field: "mobileNumber", message: "Mobile number is required" });
      }
      if (!transfer.mobileProvider) {
        errors.push({ field: "mobileProvider", message: "Mobile provider is required" });
      }
    }
    
    return errors;
  }

  static getEstimatedDelivery(deliveryMethod: string): string {
    return DeliveryService.getEstimatedDelivery(deliveryMethod);
  }

  static generateTransferId(): string {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  }
}
