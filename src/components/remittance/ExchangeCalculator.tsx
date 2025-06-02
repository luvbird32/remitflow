
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Calculator } from "lucide-react"

interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.25 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", rate: 0.92 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 7.24 }
]

export function ExchangeCalculator() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")

  const calculateConversion = () => {
    if (!amount || parseFloat(amount) <= 0) return "0.00"
    
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
    const result = (parseFloat(amount) / fromRate * toRate)
    
    return result.toFixed(2)
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)
  const exchangeRate = fromCurrencyData && toCurrencyData 
    ? (toCurrencyData.rate / fromCurrencyData.rate).toFixed(4)
    : "0.0000"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Exchange Rate Calculator
        </CardTitle>
        <CardDescription>
          Calculate currency conversions with live exchange rates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Input */}
        <div>
          <label htmlFor="calc-amount" className="block text-sm font-medium mb-2">
            Amount
          </label>
          <Input
            id="calc-amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg"
            step="0.01"
            min="0"
          />
        </div>

        {/* Currency Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-sm text-gray-500">{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-sm text-gray-500">{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {amount && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-center space-y-2">
                <div className="text-sm text-gray-600">
                  {fromCurrencyData?.symbol}{amount} {fromCurrency} =
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {toCurrencyData?.symbol}{calculateConversion()} {toCurrency}
                </div>
                <div className="text-xs text-gray-500">
                  1 {fromCurrency} = {exchangeRate} {toCurrency}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium">You send</div>
                <div className="text-blue-600">{fromCurrencyData?.symbol}{amount} {fromCurrency}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-medium">They receive</div>
                <div className="text-green-600">{toCurrencyData?.symbol}{calculateConversion()} {toCurrency}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick conversion buttons */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Quick amounts</div>
          <div className="flex flex-wrap gap-2">
            {["100", "500", "1000", "5000"].map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                className="text-xs"
              >
                {fromCurrencyData?.symbol}{quickAmount}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
