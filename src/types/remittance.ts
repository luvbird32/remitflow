
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

export interface TransferFormData {
  recipientName: string;
  recipientEmail: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  purpose: string;
}
