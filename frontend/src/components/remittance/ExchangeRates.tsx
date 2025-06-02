
import React from 'react';
import { ExchangeRate } from '@/types/remittance';

const mockRates: ExchangeRate[] = [
  {
    from: 'USD',
    to: 'PHP',
    rate: 56.25,
    lastUpdated: '2024-01-15 10:30:00'
  },
  {
    from: 'USD',
    to: 'INR',
    rate: 83.15,
    lastUpdated: '2024-01-15 10:30:00'
  },
  {
    from: 'USD',
    to: 'MXN',
    rate: 17.89,
    lastUpdated: '2024-01-15 10:30:00'
  },
  {
    from: 'USD',
    to: 'NGN',
    rate: 896.50,
    lastUpdated: '2024-01-15 10:30:00'
  },
  {
    from: 'USD',
    to: 'VND',
    rate: 24356.75,
    lastUpdated: '2024-01-15 10:30:00'
  }
];

export const ExchangeRates = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Current Exchange Rates</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRates.map((rate) => (
          <div
            key={`${rate.from}-${rate.to}`}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {rate.from} to {rate.to}
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {rate.rate.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  1 {rate.from}
                </p>
                <p className="text-xs text-gray-400">
                  Updated: {new Date(rate.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Rates are updated every 5 minutes during business hours
      </p>
    </div>
  );
};
