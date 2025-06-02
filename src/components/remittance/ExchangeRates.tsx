
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ExchangeRateItem } from "./ExchangeRateItem"
import { RateAlert } from "./RateAlert"

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
            <ExchangeRateItem 
              key={`${rate.from}-${rate.to}`} 
              rate={rate} 
            />
          ))}
        </div>
        
        <RateAlert />
      </CardContent>
    </Card>
  )
}
