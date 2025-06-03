import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Clock, CheckCircle, XCircle, MapPin, AlertCircle } from "lucide-react"
import { ApiService } from "@/services/apiService"
import { useToast } from '@/hooks/use-toast'

interface TrackingStep {
  status: string
  timestamp: string
  location: string
  description: string
}

interface TransferTrackingData {
  id: string
  status: 'pending' | 'processing' | 'in_transit' | 'delivered' | 'failed'
  amount: number
  currency: string
  recipientName: string
  recipientCountry: string
  createdAt: string
  estimatedDelivery: string
  actualDelivery?: string
  trackingSteps: TrackingStep[]
}

export function TrackTransfer() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [transferData, setTransferData] = useState<TransferTrackingData | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [recentTransfers, setRecentTransfers] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load recent transfers from localStorage
    const transferHistory = JSON.parse(localStorage.getItem('transferHistory') || '[]')
    setRecentTransfers(transferHistory.slice(0, 3)) // Show last 3 transfers
  }, [])

  const generateTrackingSteps = (status: string, deliveryMethod: string): TrackingStep[] => {
    const baseSteps = [
      {
        status: "Transfer initiated",
        timestamp: new Date().toISOString(),
        location: "Processing Center",
        description: "Transfer request received and validated"
      },
      {
        status: "Payment verified",
        timestamp: new Date(Date.now() + 5 * 60000).toISOString(),
        location: "Payment Gateway",
        description: "Payment confirmation received"
      }
    ]

    if (status === 'pending') {
      return baseSteps
    } else if (status === 'processing') {
      return [
        ...baseSteps,
        {
          status: "Transfer processing",
          timestamp: new Date(Date.now() + 15 * 60000).toISOString(),
          location: "International Gateway",
          description: "Transfer is being processed through our secure network"
        }
      ]
    } else if (status === 'delivered') {
      return [
        ...baseSteps,
        {
          status: "Transfer processing",
          timestamp: new Date(Date.now() + 15 * 60000).toISOString(),
          location: "International Gateway",
          description: "Transfer processed through secure network"
        },
        {
          status: "In transit",
          timestamp: new Date(Date.now() + 30 * 60000).toISOString(),
          location: "Destination Country",
          description: "Transfer en route to recipient"
        },
        {
          status: "Delivered",
          timestamp: new Date(Date.now() + 45 * 60000).toISOString(),
          location: "Recipient Bank",
          description: "Transfer successfully delivered to recipient"
        }
      ]
    }

    return baseSteps
  }

  const handleTrack = async () => {
    setIsSearching(true)
    setNotFound(false)
    setTransferData(null)

    try {
      // First check localStorage for recent transfers
      const transferHistory = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      const localTransfer = transferHistory.find((t: any) => t.id === trackingNumber.toUpperCase())

      if (localTransfer) {
        const trackingSteps = generateTrackingSteps(localTransfer.status, 'bank')
        
        // Ensure status is properly typed
        const validStatus = ['pending', 'processing', 'in_transit', 'delivered', 'failed'].includes(localTransfer.status) 
          ? localTransfer.status as 'pending' | 'processing' | 'in_transit' | 'delivered' | 'failed'
          : 'pending'
        
        setTransferData({
          id: localTransfer.id,
          status: validStatus,
          amount: localTransfer.amount,
          currency: localTransfer.currency,
          recipientName: localTransfer.recipientName,
          recipientCountry: localTransfer.recipientCountry,
          createdAt: localTransfer.createdAt,
          estimatedDelivery: localTransfer.estimatedDelivery,
          trackingSteps
        })
        
        toast({
          title: "Transfer Found",
          description: `Found transfer ${trackingNumber.toUpperCase()}`
        })
      } else {
        // Try API call for demo data
        try {
          const result = await ApiService.trackTransfer(trackingNumber) as TransferTrackingData
          setTransferData(result)
        } catch (error) {
          // Use demo data if API fails
          const demoData = getDemoData(trackingNumber.toUpperCase())
          if (demoData) {
            setTransferData(demoData)
          } else {
            setNotFound(true)
            toast({
              title: "Transfer Not Found",
              description: "Please check your tracking number and try again",
              variant: "destructive"
            })
          }
        }
      }
    } catch (error) {
      console.error('Tracking error:', error)
      toast({
        title: "Tracking Error",
        description: "Unable to track transfer. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSearching(false)
    }
  }

  const getDemoData = (trackingId: string): TransferTrackingData | null => {
    const demoTransfers: { [key: string]: TransferTrackingData } = {
      "TRF001234": {
        id: "TRF001234",
        status: "delivered",
        amount: 500,
        currency: "USD",
        recipientName: "Jane Smith",
        recipientCountry: "GB",
        createdAt: "2024-01-15T10:30:00Z",
        estimatedDelivery: "1-3 business days",
        actualDelivery: "2024-01-16T14:30:00Z",
        trackingSteps: generateTrackingSteps('delivered', 'bank')
      },
      "TRF005678": {
        id: "TRF005678",
        status: "processing",
        amount: 250,
        currency: "USD",
        recipientName: "Bob Wilson",
        recipientCountry: "NG",
        createdAt: "2024-01-16T09:15:00Z",
        estimatedDelivery: "1-3 business days",
        trackingSteps: generateTrackingSteps('processing', 'bank')
      }
    }
    return demoTransfers[trackingId] || null
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "processing":
      case "in_transit":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-800 border-green-200"
      case "processing":
      case "in_transit":
        return "bg-blue-50 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-50 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-50 text-red-800 border-red-200"
      default:
        return "bg-gray-50 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="modern-card p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
          <Search className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            Track Your Transfer
          </h3>
          <p className="text-slate-600 font-medium">
            Enter your tracking number to see the status of your money transfer
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Search Form */}
        <div className="flex gap-3">
          <Input
            placeholder="Enter tracking number (e.g., TXN12345678)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 h-12"
          />
          <Button 
            onClick={handleTrack} 
            disabled={!trackingNumber || isSearching}
            className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {isSearching ? "Searching..." : "Track"}
          </Button>
        </div>

        {/* Recent Transfers */}
        {recentTransfers.length > 0 && (
          <div className="modern-card p-6">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Transfers
            </h4>
            <div className="space-y-3">
              {recentTransfers.map((transfer, index) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => setTrackingNumber(transfer.id)}
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
        )}

        {/* Demo tracking numbers */}
        <div className="modern-card p-4 border-l-4 border-blue-500">
          <p className="text-sm font-medium text-blue-800 mb-3">Try these demo tracking numbers:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTrackingNumber("TRF001234")}
              className="text-xs"
            >
              TRF001234 (Delivered)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTrackingNumber("TRF005678")}
              className="text-xs"
            >
              TRF005678 (Processing)
            </Button>
          </div>
        </div>

        {/* Not Found Message */}
        {notFound && (
          <div className="modern-card p-6 text-center border-l-4 border-red-500">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-red-800 mb-2">Transfer not found</h4>
            <p className="text-red-600">Please check your tracking number and try again</p>
          </div>
        )}

        {/* Transfer Details */}
        {transferData && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Card */}
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

            {/* Tracking Timeline */}
            <div className="modern-card p-6">
              <h4 className="text-lg font-semibold mb-6 text-slate-800">Tracking Timeline</h4>
              <div className="space-y-4">
                {transferData.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-800">{step.status}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(step.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{step.description}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <p className="text-xs text-slate-500">{step.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="modern-card p-6">
              <h4 className="font-semibold mb-4 text-slate-800">Delivery Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Estimated Delivery</span>
                  <span className="font-medium">{transferData.estimatedDelivery}</span>
                </div>
                {transferData.actualDelivery && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Actual Delivery</span>
                    <span className="font-medium text-green-600">
                      {new Date(transferData.actualDelivery).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support */}
            <div className="modern-card p-6 bg-gradient-to-r from-slate-50 to-gray-50">
              <h4 className="font-semibold mb-3 text-slate-800">Need Help?</h4>
              <p className="text-slate-600 mb-4">
                If you have questions about your transfer, our support team is here to help.
              </p>
              <Button variant="outline" className="hover:bg-white">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
