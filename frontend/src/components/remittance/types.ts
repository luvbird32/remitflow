
export interface TransferFormData {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  recipientCountry: string;
  recipientName: string;
  deliveryMethod: string;
  bankName: string;
  accountNumber: string;
  cardIssuer: string;
  cardNumber: string;
  mobileProvider: string;
  mobileNumber: string;
}

export interface FormErrors {
  amount?: string;
  recipientName?: string;
  recipientCountry?: string;
  deliveryMethod?: string;
  bankName?: string;
  accountNumber?: string;
  cardIssuer?: string;
  cardNumber?: string;
  mobileProvider?: string;
  mobileNumber?: string;
}
