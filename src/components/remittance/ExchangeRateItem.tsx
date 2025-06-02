
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ExchangeRate {
  from: string
  to: string
  rate: number
  change: number
  lastUpdated: string
}

interface ExchangeRateItemProps {
  rate: ExchangeRate
}

export function ExchangeRateItem({ rate }: ExchangeRateItemProps) {
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(3)}`
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
  )
}
