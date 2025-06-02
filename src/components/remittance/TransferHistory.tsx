
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle } from "lucide-react"
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
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer History</CardTitle>
        <CardDescription>
          Your recent money transfers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(transfer.status)}
                <div>
                  <p className="font-medium">{transfer.recipientName}</p>
                  <p className="text-sm text-gray-500">{transfer.recipientEmail}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${transfer.amount} {transfer.currency}</p>
                <Badge className={getStatusColor(transfer.status)}>
                  {transfer.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
