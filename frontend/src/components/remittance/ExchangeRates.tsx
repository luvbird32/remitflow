
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { ExchangeRate } from '@/types/remittance';

export const ExchangeRates = () => {
  // Mock exchange rate data
  const exchangeRates: (ExchangeRate & { change: number; trend: 'up' | 'down' | 'stable' })[] = [
    {
      from: 'USD',
      to: 'EUR',
      rate: 0.85,
      change: 0.02,
      trend: 'up'
    },
    {
      from: 'USD',
      to: 'GBP',
      rate: 0.73,
      change: -0.01,
      trend: 'down'
    },
    {
      from: 'USD',
      to: 'INR',
      rate: 83.15,
      change: 0.0,
      trend: 'stable'
    },
    {
      from: 'USD',
      to: 'PHP',
      rate: 56.25,
      change: 0.15,
      trend: 'up'
    },
    {
      from: 'EUR',
      to: 'USD',
      rate: 1.18,
      change: -0.03,
      trend: 'down'
    },
    {
      from: 'GBP',
      to: 'USD',
      rate: 1.37,
      change: 0.01,
      trend: 'up'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Live Exchange Rates
        </CardTitle>
        <CardDescription>
          Real-time currency exchange rates updated every minute
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exchangeRates.map((rate, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg">
                  {rate.from} → {rate.to}
                </div>
                {getTrendIcon(rate.trend)}
              </div>
              
              <div className="text-2xl font-bold mb-1">
                {rate.rate.toFixed(4)}
              </div>
              
              <div className={`text-sm flex items-center gap-1 ${getTrendColor(rate.trend)}`}>
                <span>
                  {rate.change > 0 ? '+' : ''}{rate.change.toFixed(4)}
                </span>
                <span>({((rate.change / rate.rate) * 100).toFixed(2)}%)</span>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Last updated: Just now
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Rate Information</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Rates are updated in real-time during market hours</li>
            <li>• Our competitive rates include a small margin</li>
            <li>• Actual transfer rates may vary based on transfer amount</li>
            <li>• Weekend and holiday rates may differ</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
