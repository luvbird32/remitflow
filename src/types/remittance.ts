
/**
 * Transfer request interface representing a money transfer transaction
 */
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

/**
 * Exchange rate interface for currency conversion data
 */
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

/**
 * Country interface for remittance destinations
 */
export interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}
