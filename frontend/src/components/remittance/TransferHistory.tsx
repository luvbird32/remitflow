
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockTransfers = [
  {
    id: '1',
    amount: 500,
    currency: 'USD',
    recipient: 'John Doe',
    status: 'completed',
    date: '2024-01-15'
  },
  {
    id: '2',
    amount: 750,
    currency: 'EUR',
    recipient: 'Jane Smith',
    status: 'pending',
    date: '2024-01-14'
  }
];

export function TransferHistory() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Transfer History</CardTitle>
        <CardDescription>View your recent money transfers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransfers.map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{transfer.recipient}</p>
                <p className="text-sm text-muted-foreground">{transfer.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{transfer.amount} {transfer.currency}</p>
                <Badge variant={transfer.status === 'completed' ? 'default' : 'secondary'}>
                  {transfer.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
