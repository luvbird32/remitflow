
import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

export interface NetworkStatus {
  isOnline: boolean
  isSlowConnection: boolean
  connectionType: string
  wasOffline: boolean
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    connectionType: 'unknown',
    wasOffline: false
  })
  const { toast } = useToast()

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine
      const wasOffline = !networkStatus.isOnline && isOnline
      
      // Detect connection type
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection?.effectiveType || 'unknown'
      const isSlowConnection = ['slow-2g', '2g'].includes(connectionType)

      setNetworkStatus(prev => ({
        isOnline,
        isSlowConnection,
        connectionType,
        wasOffline: wasOffline || prev.wasOffline
      }))

      // Show toast notifications for network changes
      if (!isOnline && networkStatus.isOnline) {
        toast({
          title: "Connection Lost",
          description: "You're now offline. Some features may not work.",
          variant: "destructive"
        })
      } else if (wasOffline) {
        toast({
          title: "Connection Restored",
          description: "You're back online!",
        })
      }
    }

    const handleOnline = () => updateNetworkStatus()
    const handleOffline = () => updateNetworkStatus()

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Listen for connection change events
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus)
    }

    // Initial check
    updateNetworkStatus()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus)
      }
    }
  }, [networkStatus.isOnline, toast])

  return networkStatus
}
