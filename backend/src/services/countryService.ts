
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

export class CountryService {
  static getAllCountries(): Country[] {
    return countries
  }

  static getCountryByCode(code: string): Country | undefined {
    return countries.find(c => c.code === code)
  }

  static getCountriesByCurrency(currencyCode: string): Country[] {
    return countries.filter(c => c.currency === currencyCode)
  }

  static getDeliveryMethods(countryCode: string): string[] {
    const country = this.getCountryByCode(countryCode)
    return country?.deliveryMethods || []
  }
}
