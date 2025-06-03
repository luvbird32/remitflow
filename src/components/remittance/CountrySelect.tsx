
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
        <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <SelectItem 
              key={country.code} 
              value={country.code}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{country.flag}</span>
                <span className="font-medium">{country.name}</span>
                <span className="text-gray-500 text-sm ml-auto">({country.currency})</span>
              </div>
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
