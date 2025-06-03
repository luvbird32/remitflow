
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, History, ArrowRight, Calendar, RefreshCw, Search } from "lucide-react"

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

export function TransferHistory() {
  const [transfers, setTransfers] = useState<TransferHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTransferHistory()
  }, [])

  const loadTransferHistory = () => {
    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      const transferHistory = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      
      // Add some demo data if no transfers exist
      if (transferHistory.length === 0) {
        const demoTransfers = [
          {
            id: "TXN87654321",
            amount: 1000,
            currency: "USD",
            recipientName: "Sarah Johnson",
            recipientCountry: "GB",
            status: "delivered",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedDelivery: "1-3 business days"
          },
          {
            id: "TXN98765432",
            amount: 250,
            currency: "USD", 
            recipientName: "Michael Chen",
            recipientCountry: "NG",
            status: "processing",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            estimatedDelivery: "2-5 business days"
          }
        ]
        
        // Store demo data
        localStorage.setItem('transferHistory', JSON.stringify(demoTransfers))
        setTransfers(demoTransfers)
      } else {
        setTransfers(transferHistory)
      }
      
      setIsLoading(false)
    }, 1000)
  }

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

  const handleTrackTransfer = (transferId: string) => {
    // This would typically navigate to track transfer section
    // For now, we'll just show a message
    console.log('Track transfer:', transferId)
  }

  if (isLoading) {
    return (
      <div className="modern-card p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
            <RefreshCw className="h-6 w-6 text-white animate-spin" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              Loading Transfer History
            </h3>
            <p className="text-slate-600">
              Fetching your recent transactions...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modern-card p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
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
        
        <Button 
          onClick={loadTransferHistory}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <div className="space-y-4">
        {transfers.map((transfer, index) => (
          <div
            key={transfer.id}
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
                    onClick={() => handleTrackTransfer(transfer.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {transfers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <History className="h-10 w-10 text-slate-400" />
            </div>
            <h4 className="text-xl font-semibold text-slate-700 mb-3">No transfers yet</h4>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Your transfer history will appear here once you make your first transfer. Start sending money to friends and family around the world.
            </p>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
              Send Your First Transfer
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
