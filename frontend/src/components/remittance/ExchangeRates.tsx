
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const mockRates = [
  { from: 'USD', to: 'EUR', rate: 0.85, change: 0.02, trend: 'up' },
  { from: 'USD', to: 'GBP', rate: 0.73, change: -0.01, trend: 'down' },
  { from: 'EUR', to: 'USD', rate: 1.18, change: 0.03, trend: 'up' },
  { from: 'EUR', to: 'GBP', rate: 0.86, change: 0.01, trend: 'up' },
  { from: 'GBP', to: 'USD', rate: 1.37, change: -0.02, trend: 'down' },
  { from: 'GBP', to: 'EUR', rate: 1.16, change: 0.02, trend: 'up' },
];

export const ExchangeRates = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const getCurrencyFlag = (currency: string) => {
    const flags = { USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧' };
    return flags[currency as keyof typeof flags] || '💱';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Current Exchange Rates</h3>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        {mockRates.map((rate, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCurrencyFlag(rate.from)}</span>
                  <span className="font-medium text-lg">{rate.from}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="text-lg">{getCurrencyFlag(rate.to)}</span>
                  <span className="font-medium text-lg">{rate.to}</span>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-blue-600">{rate.rate}</span>
                    {rate.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <span className={`text-xs ${rate.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {rate.change > 0 ? '+' : ''}{rate.change.toFixed(3)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-sm">💡 Pro Tip</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600">
            Exchange rates fluctuate throughout the day. Lock in your rate by completing your transfer quickly!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
