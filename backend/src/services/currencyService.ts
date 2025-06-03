
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 110.25 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.35 },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rate: 461.50 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rate: 147.25 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", rate: 12.15 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rate: 18.75 }
]

export class CurrencyService {
  static getAllCurrencies(): Currency[] {
    return currencies
  }

  static getCurrencyByCode(code: string): Currency | undefined {
    return currencies.find(c => c.code === code)
  }

  static calculateConvertedAmount(amount: string, fromCurrency: string, toCurrency: string): string {
    if (!amount) return "0"
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
    return (parseFloat(amount) / fromRate * toRate).toFixed(2)
  }

  static calculateExchangeRate(fromCurrency: string, toCurrency: string): number {
    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1
    return toRate / fromRate
  }
}
