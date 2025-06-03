
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, ArrowRight, Calendar, Search } from "lucide-react"

interface TransferHistoryItem {
  id: string
  amount: number
  currency: string
  recipientName: string
  recipientCountry: string
  status: 'pending' | 'processing' | 'delivered' | 'failed'
  createdAt: string
  estimatedDelivery: string
}

interface TransferHistoryItemProps {
  transfer: TransferHistoryItem
  index: number
  onTrack: (transferId: string) => void
}

export function TransferHistoryItemComponent({ transfer, index, onTrack }: TransferHistoryItemProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "failed":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCountryFlag = (countryCode: string) => {
    const flags: Record<string, string> = {
      'US': '🇺🇸',
      'GB': '🇬🇧', 
      'NG': '🇳🇬',
      'KE': '🇰🇪',
      'GH': '🇬🇭',
      'ZA': '🇿🇦',
      'CA': '🇨🇦',
      'DE': '🇩🇪'
    }
    return flags[countryCode] || '🌍'
  }

  return (
    <div
      className="modern-card-hover p-6 animate-scale-in group"
      style={{animationDelay: `${0.1 * (index + 1)}s`}}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getStatusIcon(transfer.status)}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-slate-800 text-lg">
                {transfer.recipientName}
              </h4>
              <ArrowRight className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500">
                {getCountryFlag(transfer.recipientCountry)} {transfer.recipientCountry}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(transfer.createdAt)}
              </div>
              <div className="text-slate-400">•</div>
              <div>ID: {transfer.id}</div>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Estimated delivery: {transfer.estimatedDelivery}
            </p>
          </div>
        </div>
        
        <div className="text-right space-y-3">
          <div className="text-2xl font-bold text-slate-800">
            {transfer.currency} {transfer.amount}
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(transfer.status)} font-semibold px-3 py-1 rounded-xl border`}>
              {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTrack(transfer.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Search className="h-4 w-4 mr-1" />
              Track
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
