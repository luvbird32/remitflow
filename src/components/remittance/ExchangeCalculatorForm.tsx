
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import { Currency } from './transferUtils'

interface ExchangeCalculatorFormProps {
  amount: string
  setAmount: (amount: string) => void
  fromCurrency: string
  setFromCurrency: (currency: string) => void
  toCurrency: string
  setToCurrency: (currency: string) => void
  currencies: Currency[]
  onSwapCurrencies: () => void
}

export function ExchangeCalculatorForm({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  currencies,
  onSwapCurrencies
}: ExchangeCalculatorFormProps) {
  return (
    <div className="space-y-6">
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
            onClick={onSwapCurrencies}
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
    </div>
  )
}
