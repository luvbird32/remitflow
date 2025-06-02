
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const mockHistory = [
  { 
    id: '1', 
    amount: '500', 
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    convertedAmount: '425.00',
    recipient: 'John Doe', 
    status: 'completed', 
    date: '2024-01-15',
    fee: '5.99'
  },
  { 
    id: '2', 
    amount: '250', 
    fromCurrency: 'GBP',
    toCurrency: 'USD',
    convertedAmount: '342.50',
    recipient: 'Jane Smith', 
    status: 'pending', 
    date: '2024-01-14',
    fee: '3.99'
  },
  { 
    id: '3', 
    amount: '100', 
    fromCurrency: 'EUR',
    toCurrency: 'GBP',
    convertedAmount: '86.00',
    recipient: 'Mike Johnson', 
    status: 'failed', 
    date: '2024-01-13',
    fee: '2.99'
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

export const TransferHistory = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transfer History</h3>
        <Badge variant="secondary" className="text-xs">
          {mockHistory.length} transfers
        </Badge>
      </div>
      
      {mockHistory.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">No transfers yet</p>
            <p className="text-sm text-gray-400 text-center mt-1">
              Your transfer history will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {mockHistory.map((transfer) => (
            <Card key={transfer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon status={transfer.status} />
                      <span className="font-medium text-lg">
                        {transfer.amount} {transfer.fromCurrency}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-lg text-blue-600">
                        {transfer.convertedAmount} {transfer.toCurrency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      To: <span className="font-medium">{transfer.recipient}</span>
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{new Date(transfer.date).toLocaleDateString()}</span>
                      <span>Fee: ${transfer.fee}</span>
                      <span>ID: {transfer.id}</span>
                    </div>
                  </div>
                  <Badge 
                    className={`ml-4 ${getStatusColor(transfer.status)}`}
                    variant="outline"
                  >
                    {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
