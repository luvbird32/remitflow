
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';

export const TransferForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send Money
        </CardTitle>
        <CardDescription>
          Enter the transfer details below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" placeholder="0.00" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" placeholder="USD" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Name</Label>
          <Input id="recipient" placeholder="John Doe" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Destination Country</Label>
          <Input id="country" placeholder="United States" />
        </div>
        
        <Button className="w-full">
          Send Money
        </Button>
      </CardContent>
    </Card>
  );
};
