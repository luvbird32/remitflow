
export interface TransferData {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  recipientName: string;
  recipientEmail: string;
}

export interface TransferHistory {
  id: string;
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  fee: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
  trend: 'up' | 'down';
}
