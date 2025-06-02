
export interface TransferData {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  recipientName: string;
  recipientEmail: string;
}

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
