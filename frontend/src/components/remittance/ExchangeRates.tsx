
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { currencies } from "./transferUtils"

export function ExchangeRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Exchange Rates
        </CardTitle>
        <CardDescription>
          Current exchange rates against USD
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currencies.filter(c => c.code !== 'USD').map((currency) => (
            <div
              key={currency.code}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currency.symbol}
                </div>
                <div>
                  <p className="font-medium">{currency.name}</p>
                  <p className="text-sm text-gray-500">{currency.code}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">1 USD = {currency.rate} {currency.code}</p>
                <div className="flex items-center text-sm text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.5%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
