
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export const ExchangeRates = () => {
  const exchangeRates: ExchangeRate[] = [
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
              
              <div className="text-sm text-gray-600">
                <span>
                  {rate.change > 0 ? '+' : ''}{rate.change.toFixed(4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
