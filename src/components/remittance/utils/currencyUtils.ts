// Frontend utility - only types and API communication
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

// Fallback data for when backend is unavailable
export const fallbackCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.85 },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73 }
]

// All business logic moved to backend CurrencyService
