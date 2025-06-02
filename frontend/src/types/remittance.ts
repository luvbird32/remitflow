
export interface TransferRequest {
  id: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt?: string;
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
