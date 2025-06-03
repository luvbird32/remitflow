
import { TransferRequest, ValidationError } from '../types/transfer';

export class ValidationService {
  static validateAmount(amount: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!amount || parseFloat(amount) <= 0) {
      errors.push({ field: "amount", message: "Please enter a valid amount" });
    } else if (parseFloat(amount) < 1) {
      errors.push({ field: "amount", message: "Minimum transfer amount is $1" });
    } else if (parseFloat(amount) > 10000) {
      errors.push({ field: "amount", message: "Maximum transfer amount is $10,000" });
    }
    
    return errors;
  }

  static validateRecipientInfo(recipientName: string, recipientCountry: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!recipientName.trim()) {
      errors.push({ field: "recipientName", message: "Recipient name is required" });
    }

    if (!recipientCountry) {
      errors.push({ field: "recipientCountry", message: "Please select recipient country" });
    }
    
    return errors;
  }

  static validateDeliveryMethod(deliveryMethod: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!deliveryMethod) {
      errors.push({ field: "deliveryMethod", message: "Please select delivery method" });
    }
    
    return errors;
  }

  static validatePaymentDetails(transfer: TransferRequest): ValidationError[] {
    const errors: ValidationError[] = [];
    
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

  static validateTransfer(transfer: TransferRequest): ValidationError[] {
    const errors: ValidationError[] = [];
    
    // Validate amount
    errors.push(...this.validateAmount(transfer.amount));
    
    // Validate recipient info
    errors.push(...this.validateRecipientInfo(transfer.recipientName, transfer.recipientCountry));
    
    // Validate delivery method
    errors.push(...this.validateDeliveryMethod(transfer.deliveryMethod));
    
    // Validate payment details
    errors.push(...this.validatePaymentDetails(transfer));
    
    return errors;
  }
}
