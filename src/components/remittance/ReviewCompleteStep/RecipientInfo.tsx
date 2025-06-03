
import { User, MapPin } from "lucide-react"
import { TransferFormData } from '../types'
import { countries } from '../transferUtils'

interface RecipientInfoProps {
  formData: TransferFormData
}

export function RecipientInfo({ formData }: RecipientInfoProps) {
  const countryData = countries.find(c => c.code === formData.recipientCountry)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-slate-500" />
        <span className="font-medium text-slate-700">Who's receiving it</span>
      </div>
      <div className="pl-6 space-y-2">
        <div className="font-semibold text-slate-800">{formData.recipientName}</div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="h-3 w-3" />
          <span>{countryData?.name}</span>
        </div>
      </div>
    </div>
  )
}
