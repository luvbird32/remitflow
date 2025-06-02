
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, MapPin } from "lucide-react"
import { countries } from './transferUtils'

interface CountrySelectProps {
  recipientCountry: string
  onCountryChange: (countryCode: string) => void
  error?: string
}

export function CountrySelect({
  recipientCountry,
  onCountryChange,
  error
}: CountrySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        <MapPin className="h-4 w-4 inline mr-1" />
        Recipient Country
      </label>
      <Select value={recipientCountry} onValueChange={onCountryChange}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
                <span className="text-gray-500">({country.currency})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
