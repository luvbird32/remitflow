
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

export const getDemoTransfers = (): TransferHistoryItem[] => [
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

export const ensureValidStatus = (status: string): 'pending' | 'processing' | 'delivered' | 'failed' => {
  return ['pending', 'processing', 'delivered', 'failed'].includes(status) 
    ? status as 'pending' | 'processing' | 'delivered' | 'failed'
    : 'pending'
}
