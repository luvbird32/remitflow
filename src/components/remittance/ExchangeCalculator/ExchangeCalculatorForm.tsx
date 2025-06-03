
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import { Currency } from '../utils/currencyUtils'

/**
 * Props interface for the ExchangeCalculatorForm component
 */
interface ExchangeCalculatorFormProps {
  /** Amount to convert */
  amount: string
  /** Function to update the amount */
  setAmount: (amount: string) => void
  /** Source currency code */
  fromCurrency: string
  /** Function to update the source currency */
  setFromCurrency: (currency: string) => void
  /** Target currency code */
  toCurrency: string
  /** Function to update the target currency */
  setToCurrency: (currency: string) => void
  /** Available currencies for selection */
  currencies: Currency[]
  /** Function to swap source and target currencies */
  onSwapCurrencies: () => void
}

/**
 * Form component for exchange rate calculator inputs.
 * 
 * This component provides the user interface for entering conversion parameters:
 * - Amount input with numerical validation
 * - Source currency selection dropdown
 * - Target currency selection dropdown
 * - Currency swap functionality
 * 
 * @param props - Component props containing form state and handlers
 * @returns JSX element with the calculator form inputs
 */
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
      {/* Amount Input Section */}
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

      {/* Currency Selection Section */}
      <div className="space-y-4">
        {/* Source Currency Selection */}
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

        {/* Currency Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={onSwapCurrencies}
            className="rounded-full"
            type="button"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Target Currency Selection */}
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
