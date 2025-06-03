
import { useToast } from '@/hooks/use-toast'

export function useTransferTracking() {
  const { toast } = useToast()

  const handleTrackTransfer = (transferResult: any, formData: any, handleSuccessDialogClose: () => void) => {
    if (transferResult?.id) {
      console.log('Tracking transfer:', transferResult.id)
      toast({
        title: "Track Transfer",
        description: `Use ID ${transferResult.id} to track your transfer status`,
      })
      
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
      
      handleSuccessDialogClose()
    }
  }

  return { handleTrackTransfer }
}
