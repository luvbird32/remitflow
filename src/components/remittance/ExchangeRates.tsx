
const mockRates = [
  { from: 'USD', to: 'EUR', rate: 0.85 },
  { from: 'USD', to: 'GBP', rate: 0.73 },
  { from: 'EUR', to: 'USD', rate: 1.18 },
];

export const ExchangeRates = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Current Exchange Rates</h3>
      <div className="grid gap-3">
        {mockRates.map((rate, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">{rate.from} → {rate.to}</span>
            <span className="text-lg font-bold text-blue-600">{rate.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
