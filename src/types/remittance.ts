
export interface TransferRequest {
  id: string
  senderName: string
  senderEmail: string
  recipientName: string
  recipientEmail: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}
