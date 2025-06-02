
import { Badge } from '@/components/ui/badge';

const mockHistory = [
  { id: '1', amount: '500', currency: 'USD', recipient: 'John Doe', status: 'completed', date: '2024-01-15' },
  { id: '2', amount: '250', currency: 'EUR', recipient: 'Jane Smith', status: 'pending', date: '2024-01-14' },
];

export const TransferHistory = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Transfers</h3>
      {mockHistory.length === 0 ? (
        <p className="text-gray-500">No transfers yet</p>
      ) : (
        <div className="space-y-3">
          {mockHistory.map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{transfer.amount} {transfer.currency} to {transfer.recipient}</p>
                <p className="text-sm text-gray-500">{transfer.date}</p>
              </div>
              <Badge variant={transfer.status === 'completed' ? 'default' : 'secondary'}>
                {transfer.status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
