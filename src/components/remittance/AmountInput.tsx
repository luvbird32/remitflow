
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { currencies } from './transferUtils'

interface AmountInputProps {
  amount: string
  setAmount: (amount: string) => void
  fromCurrency: string
  setFromCurrency: (currency: string) => void
  error?: string
}

export function AmountInput({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  error
}: AmountInputProps) {
  return (
    <div>
      <label htmlFor="amount" className="block text-sm font-medium mb-2">
        You Send
      </label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={error ? "border-red-500" : ""}
            step="0.01"
            min="0"
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
