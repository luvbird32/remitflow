
export interface Country {
  code: string
  name: string
  currency: string
  flag: string
  deliveryMethods: string[]
}

export const countries: Country[] = [
  { code: "US", name: "United States", currency: "USD", flag: "🇺🇸", deliveryMethods: ["bank", "card"] },
  { code: "GB", name: "United Kingdom", currency: "GBP", flag: "🇬🇧", deliveryMethods: ["bank", "card"] },
  { code: "NG", name: "Nigeria", currency: "NGN", flag: "🇳🇬", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "KE", name: "Kenya", currency: "KES", flag: "🇰🇪", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "GH", name: "Ghana", currency: "GHS", flag: "🇬🇭", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "ZA", name: "South Africa", currency: "ZAR", flag: "🇿🇦", deliveryMethods: ["bank", "card"] },
  { code: "CA", name: "Canada", currency: "CAD", flag: "🇨🇦", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", currency: "JPY", flag: "🇯🇵", deliveryMethods: ["bank", "card"] }
]
