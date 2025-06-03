
import { useState, useEffect } from "react"
import { EnhancedApiService } from "@/services/enhancedApiService"
import { useToast } from '@/hooks/use-toast'
import { generateTrackingSteps, getDemoData } from './trackingUtils'

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

export function useTrackTransfer() {
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
          const result = await EnhancedApiService.trackTransfer(trackingNumber) as TransferTrackingData
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

  return {
    trackingNumber,
    setTrackingNumber,
    transferData,
    isSearching,
    notFound,
    recentTransfers,
    handleTrack
  }
}
