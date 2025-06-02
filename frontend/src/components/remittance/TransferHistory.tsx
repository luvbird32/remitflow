
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Transfer } from '@/types/remittance';

const mockTransfers: Transfer[] = [
  {
    id: '1',
    recipientName: 'John Doe',
    amount: 500,
    currency: 'USD',
    status: 'completed',
    date: '2024-01-15',
    country: 'Philippines'
  },
  {
    id: '2',
    recipientName: 'Jane Smith',
    amount: 300,
    currency: 'USD',
    status: 'pending',
    date: '2024-01-14',
    country: 'India'
  },
  {
    id: '3',
    recipientName: 'Bob Johnson',
    amount: 750,
    currency: 'USD',
    status: 'failed',
    date: '2024-01-13',
    country: 'Mexico'
  }
];

export const TransferHistory = () => {
  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Transfer History</h2>
      
      {mockTransfers.length === 0 ? (
        <p className="text-gray-500">No transfers found</p>
      ) : (
        <div className="space-y-3">
          {mockTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{transfer.recipientName}</h3>
                  <p className="text-sm text-gray-600">{transfer.country}</p>
                  <p className="text-sm text-gray-500">{transfer.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transfer.amount}</p>
                  <Badge variant={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
