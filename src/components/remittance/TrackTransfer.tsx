
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Clock, CheckCircle, XCircle, MapPin } from "lucide-react"
import { TransferRequest } from "@/types/remittance"

// Mock data for demonstration
const mockTransferData: { [key: string]: TransferRequest & { trackingSteps: Array<{ status: string; timestamp: string; location: string }> } } = {
  "TRF001234": {
    id: "TRF001234",
    senderName: "John Doe",
    senderEmail: "john@example.com",
    recipientName: "Jane Smith",
    recipientEmail: "jane@example.com",
    amount: 500,
    currency: "USD",
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    trackingSteps: [
      { status: "Transfer initiated", timestamp: "2024-01-15T10:30:00Z", location: "New York, USA" },
      { status: "Payment verified", timestamp: "2024-01-15T10:35:00Z", location: "New York, USA" },
      { status: "Transfer in progress", timestamp: "2024-01-15T11:00:00Z", location: "Processing Center" },
      { status: "Transfer completed", timestamp: "2024-01-15T11:45:00Z", location: "London, UK" }
    ]
  },
  "TRF005678": {
    id: "TRF005678",
    senderName: "Alice Johnson",
    senderEmail: "alice@example.com",
    recipientName: "Bob Wilson",
    recipientEmail: "bob@example.com",
    amount: 250,
    currency: "USD",
    status: "pending",
    createdAt: "2024-01-16T09:15:00Z",
    trackingSteps: [
      { status: "Transfer initiated", timestamp: "2024-01-16T09:15:00Z", location: "Los Angeles, USA" },
      { status: "Payment verified", timestamp: "2024-01-16T09:20:00Z", location: "Los Angeles, USA" },
      { status: "Transfer in progress", timestamp: "2024-01-16T09:45:00Z", location: "Processing Center" }
    ]
  }
}

export function TrackTransfer() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [transferData, setTransferData] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleTrack = async () => {
    setIsSearching(true)
    setNotFound(false)
    
    // Simulate API call delay
    setTimeout(() => {
      const found = mockTransferData[trackingNumber.toUpperCase()]
      if (found) {
        setTransferData(found)
        setNotFound(false)
      } else {
        setTransferData(null)
        setNotFound(true)
      }
      setIsSearching(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
      case "in progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Track Your Transfer
        </CardTitle>
        <CardDescription>
          Enter your tracking number to see the status of your money transfer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Form */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter tracking number (e.g., TRF001234)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleTrack} 
            disabled={!trackingNumber || isSearching}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSearching ? "Searching..." : "Track"}
          </Button>
        </div>

        {/* Demo tracking numbers */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 font-medium mb-2">Demo tracking numbers:</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTrackingNumber("TRF001234")}
              className="text-xs"
            >
              TRF001234 (Completed)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTrackingNumber("TRF005678")}
              className="text-xs"
            >
              TRF005678 (In Progress)
            </Button>
          </div>
        </div>

        {/* Not Found Message */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-800 font-medium">Transfer not found</p>
            <p className="text-red-600 text-sm">Please check your tracking number and try again</p>
          </div>
        )}

        {/* Transfer Details */}
        {transferData && (
          <div className="space-y-4">
            {/* Summary Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-blue-900">Transfer #{transferData.id}</h3>
                  <p className="text-blue-700 text-sm">
                    From {transferData.senderName} to {transferData.recipientName}
                  </p>
                </div>
                <Badge className={getStatusColor(transferData.status)}>
                  {transferData.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Amount:</span>
                  <span className="font-medium ml-2">${transferData.amount} {transferData.currency}</span>
                </div>
                <div>
                  <span className="text-blue-600">Date:</span>
                  <span className="font-medium ml-2">
                    {new Date(transferData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h4 className="font-semibold mb-3">Tracking Timeline</h4>
              <div className="space-y-3">
                {transferData.trackingSteps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{step.status}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(step.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">{step.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-3">
                If you have questions about your transfer, our support team is here to help.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
