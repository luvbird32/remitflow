
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { TransferData } from '@/types/remittance';

const exchangeRates = {
  'USD-EUR': 0.85,
  'USD-GBP': 0.73,
  'EUR-USD': 1.18,
  'EUR-GBP': 0.86,
  'GBP-USD': 1.37,
  'GBP-EUR': 1.16,
};

export const TransferForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TransferData>({
    amount: '',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipientName: '',
    recipientEmail: ''
  });

  const calculateConvertedAmount = () => {
    if (!formData.amount) return 0;
    const rate = exchangeRates[`${formData.fromCurrency}-${formData.toCurrency}` as keyof typeof exchangeRates] || 1;
    return (parseFloat(formData.amount) * rate).toFixed(2);
  };

  const getTransferFee = () => {
    const amount = parseFloat(formData.amount) || 0;
    return Math.max(2.99, amount * 0.01).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Transfer data:', formData);
      toast({
        title: "Transfer Initiated Successfully!",
        description: `${formData.amount} ${formData.fromCurrency} → ${calculateConvertedAmount()} ${formData.toCurrency} to ${formData.recipientName}`,
      });
      setIsLoading(false);
      
      // Reset form
      setFormData({
        amount: '',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        recipientName: '',
        recipientEmail: ''
      });
    }, 2000);
  };

  const isFormValid = formData.amount && formData.recipientName && formData.recipientEmail;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount and Currency Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Transfer Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="amount">Send Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="text-lg font-semibold"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>From</Label>
                <Select
                  value={formData.fromCurrency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, fromCurrency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">🇺🇸 USD</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                    <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select
                  value={formData.toCurrency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, toCurrency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">🇺🇸 USD</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                    <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.amount && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recipient receives:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {calculateConvertedAmount()} {formData.toCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-gray-500">Transfer fee:</span>
                  <span className="text-gray-700">${getTransferFee()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recipient Information */}
        <Card>
          <CardHeader>
            <CardTitle>Recipient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Full Name</Label>
                <Input
                  id="recipientName"
                  placeholder="John Doe"
                  value={formData.recipientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipientName: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Email Address</Label>
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
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800">Security Notice</p>
            <p className="text-yellow-700">
              Your transfer will be processed securely. Please verify all recipient details before confirming.
            </p>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-6 text-lg"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Transfer...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Send Money
              <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </Button>
      </form>
    </div>
  );
};
