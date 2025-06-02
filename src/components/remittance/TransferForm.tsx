
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { TransferData } from '@/types/remittance';

export const TransferForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TransferData>({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipientName: '',
    recipientEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your backend API
    console.log('Transfer data:', formData);
    toast({
      title: "Transfer Initiated",
      description: `Sending ${formData.amount} ${formData.fromCurrency} to ${formData.recipientName}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Currency Exchange</Label>
          <div className="flex items-center space-x-2">
            <Select
              value={formData.fromCurrency}
              onValueChange={(value) => setFormData(prev => ({ ...prev, fromCurrency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <Select
              value={formData.toCurrency}
              onValueChange={(value) => setFormData(prev => ({ ...prev, toCurrency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            id="recipientName"
            placeholder="John Doe"
            value={formData.recipientName}
            onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="recipientEmail">Recipient Email</Label>
          <Input
            id="recipientEmail"
            type="email"
            placeholder="john@example.com"
            value={formData.recipientEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, recipientEmail: e.target.value }))}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Send Money
      </Button>
    </form>
  );
};
