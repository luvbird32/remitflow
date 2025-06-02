
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function TransferForm() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transfer submitted:', { amount, recipient, country });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Transfer money internationally with competitive rates</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount (USD)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <Input
              id="recipient"
              type="text"
              placeholder="John Doe"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Destination Country
            </label>
            <Input
              id="country"
              type="text"
              placeholder="United Kingdom"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
