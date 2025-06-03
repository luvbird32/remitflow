// Frontend utility - only types and API communication  
export interface Country {
  code: string
  name: string
  currency: string
  flag: string
  deliveryMethods: string[]
}

// Fallback data for when backend is unavailable
export const fallbackCountries: Country[] = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", deliveryMethods: ["bank", "card"] },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", deliveryMethods: ["bank", "card", "wallet"] }
]

// All business logic moved to backend CountryService
