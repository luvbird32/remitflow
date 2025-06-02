
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TransferHistory as TransferHistoryType } from '@/types/remittance';

const mockTransfers: TransferHistoryType[] = [
  {
    id: '1',
    amount: '1000',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    convertedAmount: '850',
    recipient: 'John Doe',
    status: 'completed',
    date: '2024-01-15',
    fee: '5.00'
  },
  {
    id: '2',
    amount: '500',
    fromCurrency: 'EUR',
    toCurrency: 'GBP',
    convertedAmount: '430',
    recipient: 'Jane Smith',
    status: 'pending',
    date: '2024-01-14',
    fee: '3.50'
  }
];

export const TransferHistory = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransfers.map((transfer) => (
            <div key={transfer.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{transfer.recipient}</h3>
                  <p className="text-sm text-gray-600">{transfer.date}</p>
                </div>
                <Badge className={getStatusColor(transfer.status)}>
                  {transfer.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-medium">
                    {transfer.amount} {transfer.fromCurrency}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Converted:</span>
                  <span className="ml-2 font-medium">
                    {transfer.convertedAmount} {transfer.toCurrency}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Fee:</span>
                  <span className="ml-2 font-medium">{transfer.fee} {transfer.fromCurrency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
