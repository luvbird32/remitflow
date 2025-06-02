
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Calculator } from "lucide-react"
import { ApiService } from '@/services/apiService'
import { Currency } from './transferUtils'

export function ExchangeCalculator() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [conversionResult, setConversionResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load currencies from backend
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await ApiService.getCurrencies()
        // Type check the response
        if (Array.isArray(data)) {
          setCurrencies(data)
        }
      } catch (error) {
        console.error('Failed to load currencies:', error)
      }
    }
    loadCurrencies()
  }, [])

  // Calculate conversion when inputs change
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateConversion()
    } else {
      setConversionResult(null)
    }
  }, [amount, fromCurrency, toCurrency])

  const calculateConversion = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setConversionResult(null)
      return
    }
    
    setIsLoading(true)
    try {
      const result = await ApiService.convertCurrency({
        amount,
        from: fromCurrency,
        to: toCurrency
      })
      setConversionResult(result)
    } catch (error) {
      console.error('Conversion error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === toCurrency)

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
        {(conversionResult || isLoading) && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Calculating...</div>
                </div>
              </div>
            ) : conversionResult && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-center space-y-2">
                  <div className="text-sm text-gray-600">
                    {fromCurrencyData?.symbol}{amount} {fromCurrency} =
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {toCurrencyData?.symbol}{conversionResult.convertedAmount} {toCurrency}
                  </div>
                  <div className="text-xs text-gray-500">
                    1 {fromCurrency} = {conversionResult.rate} {toCurrency}
                  </div>
                </div>
              </div>
            )}

            {conversionResult && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">You send</div>
                  <div className="text-blue-600">{fromCurrencyData?.symbol}{amount} {fromCurrency}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium">They receive</div>
                  <div className="text-green-600">{toCurrencyData?.symbol}{conversionResult.convertedAmount} {toCurrency}</div>
                </div>
              </div>
            )}
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
