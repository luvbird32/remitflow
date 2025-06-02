
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, History } from 'lucide-react';
import { Transfer } from '@/types/remittance';

export const TransferHistory = () => {
  // Mock data for demonstration
  const transfers: Transfer[] = [
    {
      id: 'TXN001',
      amount: '500.00',
      currency: 'USD',
      recipient: 'John Doe',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'TXN002',
      amount: '250.00',
      currency: 'EUR',
      recipient: 'Jane Smith',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: 'TXN003',
      amount: '1000.00',
      currency: 'USD',
      recipient: 'Mike Johnson',
      status: 'failed',
      date: '2024-01-13'
    },
    {
      id: 'TXN004',
      amount: '750.00',
      currency: 'GBP',
      recipient: 'Sarah Wilson',
      status: 'completed',
      date: '2024-01-12'
    }
  ];

  const getStatusIcon = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Transfer History
        </CardTitle>
        <CardDescription>
          View all your recent money transfers and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transfers.map((transfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(transfer.status)}
                <div>
                  <div className="font-semibold">{transfer.recipient}</div>
                  <div className="text-sm text-gray-600">
                    Transaction ID: {transfer.id}
                  </div>
                  <div className="text-sm text-gray-500">{transfer.date}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-lg">
                  {transfer.amount} {transfer.currency}
                </div>
                <Badge variant={getStatusVariant(transfer.status)} className="mt-1">
                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {transfers.length === 0 && (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No transfers found</p>
            <p className="text-sm text-gray-400">Your transfer history will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
