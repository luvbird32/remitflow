
export interface Transfer {
  id: string;
  recipientName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  country: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}
