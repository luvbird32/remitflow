
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { ExchangeRate } from "@/types/remittance"

// Mock data for demonstration
const mockRates: ExchangeRate[] = [
  {
    from: "USD",
    to: "EUR",
    rate: 0.85,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "GBP",
    rate: 0.73,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "JPY",
    rate: 110.25,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "CAD",
    rate: 1.35,
    lastUpdated: "2024-01-15T12:00:00Z"
  }
]

export function ExchangeRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rates</CardTitle>
        <CardDescription>
          Current exchange rates (updated every minute)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRates.map((rate) => (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium">
                  {rate.from} → {rate.to}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-medium">{rate.rate}</span>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
