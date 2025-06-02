
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ExchangeRate } from '@/types/remittance';

const mockRates: ExchangeRate[] = [
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
    rate: 0.75,
    change: -0.01,
    trend: 'down'
  },
  {
    from: 'EUR',
    to: 'GBP',
    rate: 0.88,
    change: 0.01,
    trend: 'up'
  }
];

export const ExchangeRates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRates.map((rate, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <div className="font-semibold">
                  {rate.from} → {rate.to}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {rate.rate.toFixed(4)}
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center ${rate.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {rate.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="ml-1">
                    {Math.abs(rate.change).toFixed(4)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">24h change</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
