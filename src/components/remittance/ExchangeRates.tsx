
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ExchangeRate {
  from: string
  to: string
  rate: number
  change: number
  lastUpdated: string
}

// Enhanced mock data with trends
const mockRates: ExchangeRate[] = [
  {
    from: "USD",
    to: "EUR",
    rate: 0.85,
    change: 0.02,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "GBP",
    rate: 0.73,
    change: -0.01,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "JPY",
    rate: 110.25,
    change: 1.5,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "CAD",
    rate: 1.35,
    change: 0.003,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "AUD",
    rate: 1.52,
    change: -0.02,
    lastUpdated: "2024-01-15T12:00:00Z"
  },
  {
    from: "USD",
    to: "CHF",
    rate: 0.92,
    change: 0.01,
    lastUpdated: "2024-01-15T12:00:00Z"
  }
]

export function ExchangeRates() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdate(new Date())
    setIsRefreshing(false)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(3)}`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Exchange Rates</CardTitle>
            <CardDescription>
              Live rates updated every minute
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRates.map((rate) => (
            <div
              key={`${rate.from}-${rate.to}`}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">
                  <span className="font-bold">{rate.from}</span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="font-bold">{rate.to}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  1 {rate.from}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-semibold">{rate.rate.toFixed(4)}</div>
                  <div className={`text-xs flex items-center gap-1 ${
                    rate.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {rate.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {formatChange(rate.change)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-sm">Rate Alert</h4>
              <p className="text-xs text-gray-600 mt-1">
                Set up notifications to get the best exchange rates for your transfers
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
