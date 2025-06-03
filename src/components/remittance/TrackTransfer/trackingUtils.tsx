
import { CheckCircle, Clock, AlertCircle, XCircle, Package } from "lucide-react"

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

export const generateTrackingSteps = (status: string, deliveryMethod: string): TrackingStep[] => {
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

export const getDemoData = (trackingId: string): TransferTrackingData | null => {
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

export const getStatusIcon = (status: string) => {
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

export const getStatusColor = (status: string) => {
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
