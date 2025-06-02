
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, History, ArrowRight, Calendar } from "lucide-react"
import { TransferRequest } from "@/types/remittance"

// Mock data for demonstration
const mockTransfers: TransferRequest[] = [
  {
    id: "1",
    senderName: "John Doe",
    senderEmail: "john@example.com",
    recipientName: "Jane Smith",
    recipientEmail: "jane@example.com",
    amount: 100,
    currency: "USD",
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    senderName: "John Doe",
    senderEmail: "john@example.com",
    recipientName: "Bob Johnson",
    recipientEmail: "bob@example.com",
    amount: 250,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-14T15:45:00Z"
  }
]

export function TransferHistory() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
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
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
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
      year: 'numeric'
    })
  }

  return (
    <div className="modern-card p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-500/25">
          <History className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            Transfer History
          </h3>
          <p className="text-slate-600 font-medium">
            Track and review your recent money transfers
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockTransfers.map((transfer, index) => (
          <div
            key={transfer.id}
            className="modern-card-hover p-6 animate-scale-in"
            style={{animationDelay: `${0.1 * (index + 1)}s`}}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(transfer.status)}
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-slate-800 text-lg">
                      {transfer.recipientName}
                    </h4>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(transfer.createdAt)}
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {transfer.recipientEmail}
                  </p>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-slate-800">
                  ${transfer.amount} {transfer.currency}
                </div>
                <Badge className={`${getStatusColor(transfer.status)} font-semibold px-3 py-1 rounded-xl border`}>
                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
        
        {mockTransfers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <History className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 mb-2">No transfers yet</h4>
            <p className="text-slate-500">Your transfer history will appear here once you make your first transfer.</p>
          </div>
        )}
      </div>
    </div>
  )
}
