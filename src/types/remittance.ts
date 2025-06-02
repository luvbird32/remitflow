
export interface Transfer {
  id: string;
  amount: string;
  currency: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export interface TransferData {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  recipientName: string;
  recipientEmail: string;
}

export interface TransferFormData {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientCountry: string;
}
