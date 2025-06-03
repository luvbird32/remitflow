
import { Badge } from "@/components/ui/badge"

interface TransferSummaryCardProps {
  transferData: {
    id: string
    recipientName: string
    recipientCountry: string
    status: string
    currency: string
    amount: number
    createdAt: string
  }
  getStatusColor: (status: string) => string
}

export function TransferSummaryCard({ transferData, getStatusColor }: TransferSummaryCardProps) {
  return (
    <div className="modern-card p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Transfer #{transferData.id}</h3>
          <p className="text-slate-600">
            To {transferData.recipientName} • {transferData.recipientCountry}
          </p>
        </div>
        <Badge className={`${getStatusColor(transferData.status)} text-sm px-3 py-2`}>
          {transferData.status.charAt(0).toUpperCase() + transferData.status.slice(1)}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <span className="text-slate-500 text-sm font-medium">Amount</span>
          <p className="text-2xl font-bold text-slate-800">
            {transferData.currency} {transferData.amount}
          </p>
        </div>
        <div>
          <span className="text-slate-500 text-sm font-medium">Date</span>
          <p className="text-lg font-semibold text-slate-800">
            {new Date(transferData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
