
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock, Truck } from "lucide-react"

export function TrackTransfer() {
  const [trackingId, setTrackingId] = useState("")
  const [transfer, setTransfer] = useState<any>(null)

  const handleTrack = () => {
    // Simulate tracking - in a real app, this would call an API
    if (trackingId) {
      setTransfer({
        id: trackingId,
        status: "in_transit",
        amount: 100,
        currency: "USD",
        recipient: "Jane Smith",
        estimatedDelivery: "2024-01-16",
        steps: [
          { status: "completed", title: "Transfer initiated", time: "2024-01-15 10:30" },
          { status: "completed", title: "Payment processed", time: "2024-01-15 10:45" },
          { status: "current", title: "In transit", time: "2024-01-15 11:00" },
          { status: "pending", title: "Delivered", time: "" }
        ]
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "current":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Track Transfer
        </CardTitle>
        <CardDescription>
          Enter your tracking ID to check transfer status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button onClick={handleTrack}>
              Track
            </Button>
          </div>

          {transfer && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <h3 className="font-medium">Transfer to {transfer.recipient}</h3>
                  <p className="text-sm text-gray-600">${transfer.amount} {transfer.currency}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {transfer.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-3">
                {transfer.steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    {getStatusIcon(step.status)}
                    <div className="flex-1">
                      <p className={`font-medium ${step.status === 'pending' ? 'text-gray-400' : ''}`}>
                        {step.title}
                      </p>
                      {step.time && (
                        <p className="text-sm text-gray-500">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
