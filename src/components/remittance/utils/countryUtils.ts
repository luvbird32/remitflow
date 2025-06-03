
export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  deliveryMethods: string[]
}

export const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", deliveryMethods: ["bank", "card"] },
  { code: "EU", name: "European Union", flag: "🇪🇺", currency: "EUR", deliveryMethods: ["bank", "card"] },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", deliveryMethods: ["bank"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", deliveryMethods: ["bank", "card"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", deliveryMethods: ["bank", "card"] },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", deliveryMethods: ["bank"] },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", deliveryMethods: ["bank", "wallet"] },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", deliveryMethods: ["bank", "wallet"] },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", deliveryMethods: ["bank", "wallet"] },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", deliveryMethods: ["bank", "wallet"] },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", deliveryMethods: ["bank", "card"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", currency: "MXN", deliveryMethods: ["bank", "card", "wallet"] },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", deliveryMethods: ["bank", "card"] },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP", deliveryMethods: ["bank", "wallet"] }
]
