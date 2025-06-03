
import { useToast } from '@/hooks/use-toast'

export function useTransferTracking() {
  const { toast } = useToast()

  const handleTrackTransfer = (transferResult: any, formData: any, handleSuccessDialogClose: () => void) => {
    if (transferResult?.id) {
      console.log('Tracking transfer:', transferResult.id)
      
      // Store transfer ID in localStorage for tracking
      const existingTransfers = JSON.parse(localStorage.getItem('transferHistory') || '[]')
      const newTransfer = {
        id: transferResult.id,
        amount: formData.amount,
        currency: formData.fromCurrency,
        recipientName: formData.recipientName,
        recipientCountry: formData.recipientCountry,
        status: transferResult.status,
        createdAt: new Date().toISOString(),
        estimatedDelivery: transferResult.estimatedDelivery
      }
      
      const updatedTransfers = [newTransfer, ...existingTransfers.slice(0, 9)]
      localStorage.setItem('transferHistory', JSON.stringify(updatedTransfers))
      
      // Close the dialog first
      handleSuccessDialogClose()
      
      // Switch to track tab and set the tracking ID
      setTimeout(() => {
        // Trigger tab change to track
        const event = new CustomEvent('switchToTrack', { 
          detail: { transferId: transferResult.id } 
        })
        window.dispatchEvent(event)
        
        toast({
          title: "Switched to Tracking",
          description: `Now tracking transfer ${transferResult.id}`,
        })
      }, 100)
    }
  }

  return { handleTrackTransfer }
}
