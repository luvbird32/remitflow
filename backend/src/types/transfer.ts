
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
  deliveryMethods: string[];
}

export interface TransferRequest {
  id?: string;
  amount: string;
  recipientName: string;
  recipientEmail: string;
  recipientCountry: string;
  deliveryMethod: string;
  fromCurrency: string;
  toCurrency: string;
  accountNumber?: string;
  bankName?: string;
  cardNumber?: string;
  cardIssuer?: string;
  mobileNumber?: string;
  mobileProvider?: string;
  senderName?: string;
  senderEmail?: string;
  status?: 'pending' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}

export interface TransferResponse {
  id: string;
  status: string;
  convertedAmount: string;
  fee: number;
  totalAmount: string;
  estimatedDelivery: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
