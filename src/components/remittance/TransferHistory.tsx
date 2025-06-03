
import { useState, useEffect } from "react"
import { TransferHistoryHeader } from "./TransferHistory/TransferHistoryHeader"
import { TransferHistoryItemComponent } from "./TransferHistory/TransferHistoryItem"
import { EmptyState } from "./TransferHistory/EmptyState"
import { LoadingState } from "./TransferHistory/LoadingState"
import { getDemoTransfers, ensureValidStatus } from "./TransferHistory/utils"

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
        const demoTransfers = getDemoTransfers()
        
        // Store demo data
        localStorage.setItem('transferHistory', JSON.stringify(demoTransfers))
        setTransfers(demoTransfers)
      } else {
        // Ensure status values are properly typed
        const typedTransfers: TransferHistoryItem[] = transferHistory.map((transfer: any) => ({
          ...transfer,
          status: ensureValidStatus(transfer.status)
        }))
        setTransfers(typedTransfers)
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const handleTrackTransfer = (transferId: string) => {
    console.log('Track transfer:', transferId)
  }

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="modern-card p-4 sm:p-6 md:p-8 animate-fade-in">
      <TransferHistoryHeader onRefresh={loadTransferHistory} />
      
      <div className="space-y-3 sm:space-y-4">
        {transfers.map((transfer, index) => (
          <TransferHistoryItemComponent
            key={transfer.id}
            transfer={transfer}
            index={index}
            onTrack={handleTrackTransfer}
          />
        ))}
        
        {transfers.length === 0 && <EmptyState />}
      </div>
    </div>
  )
}
