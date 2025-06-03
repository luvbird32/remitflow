
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface RecentTransfer {
  id: string
  recipientName: string
  currency: string
  amount: number
  status: string
}

interface RecentTransfersProps {
  transfers: RecentTransfer[]
  onSelectTransfer: (id: string) => void
  getStatusColor: (status: string) => string
}

export function RecentTransfers({ transfers, onSelectTransfer, getStatusColor }: RecentTransfersProps) {
  if (transfers.length === 0) return null

  return (
    <div className="modern-card p-6">
      <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Recent Transfers
      </h4>
      <div className="space-y-3">
        {transfers.map((transfer) => (
          <div
            key={transfer.id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => onSelectTransfer(transfer.id)}
          >
            <div>
              <p className="font-medium text-slate-800">{transfer.id}</p>
              <p className="text-sm text-slate-600">{transfer.recipientName}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{transfer.currency} {transfer.amount}</p>
              <Badge className={getStatusColor(transfer.status)} variant="outline">
                {transfer.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
