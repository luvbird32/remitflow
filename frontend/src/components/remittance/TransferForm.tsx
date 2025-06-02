
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator } from 'lucide-react';
import { TransferData } from '@/types/remittance';
import { useToast } from '@/hooks/use-toast';

export const TransferForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TransferData>({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipientName: '',
    recipientEmail: ''
  });

  const [exchangeRate] = useState(0.85); // Mock exchange rate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.recipientName || !formData.recipientEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Transfer Initiated",
      description: `Transfer of ${formData.amount} ${formData.fromCurrency} to ${formData.recipientName} has been initiated.`,
    });

    // Reset form
    setFormData({
      amount: '',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      recipientName: '',
      recipientEmail: ''
    });
  };

  const convertedAmount = formData.amount ? (parseFloat(formData.amount) * exchangeRate).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Send Money
          </CardTitle>
          <CardDescription>
            Send money to your loved ones worldwide with competitive exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount and Currency Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={formData.fromCurrency} onValueChange={(value) => setFormData({ ...formData, fromCurrency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select value={formData.toCurrency} onValueChange={(value) => setFormData({ ...formData, toCurrency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="PHP">PHP - Philippine Peso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Exchange Rate Display */}
            {formData.amount && (
              <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{formData.amount} {formData.fromCurrency}</span>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                  <span className="text-lg font-semibold text-blue-600">{convertedAmount} {formData.toCurrency}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Rate: 1 {formData.fromCurrency} = {exchangeRate} {formData.toCurrency}
                </div>
              </div>
            )}

            {/* Recipient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recipient Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    placeholder="Enter recipient's full name"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email *</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="Enter recipient's email"
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Money
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
