
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, ExternalLink, Clock, MapPin, CreditCard } from "lucide-react"
import { TransferFormData } from './types'
import { useToast } from '@/hooks/use-toast'

interface TransferSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  formData: TransferFormData
  transferResult: any
  onTrackTransfer: () => void
}

export function TransferSuccessDialog({
  isOpen,
  onClose,
  formData,
  transferResult,
  onTrackTransfer
}: TransferSuccessDialogProps) {
  const { toast } = useToast()

  const copyTransferID = () => {
    navigator.clipboard.writeText(transferResult?.id || '')
    toast({
      title: "Copied!",
      description: "Reference number copied"
    })
  }

  const getDeliveryMethodLabel = (method: string) => {
    const labels = {
      bank: 'Bank account',
      card: 'Debit card',
      wallet: 'Mobile wallet'
    }
    return labels[method as keyof typeof labels] || method
  }

  const getCountryFlag = (countryCode: string) => {
    const flags: Record<string, string> = {
      'US': '🇺🇸',
      'GB': '🇬🇧', 
      'NG': '🇳🇬',
      'KE': '🇰🇪',
      'GH': '🇬🇭',
      'ZA': '🇿🇦',
      'CA': '🇨🇦',
      'DE': '🇩🇪'
    }
    return flags[countryCode] || '🌍'
  }

  if (!transferResult) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-green-600">
            Money Sent Successfully!
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Your money is on its way! Use the details below to check the status of your transfer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Reference Number */}
          <div className="modern-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Reference Number</p>
                <p className="text-lg font-mono font-bold text-slate-800">{transferResult.id}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyTransferID}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Amount Details */}
          <div className="modern-card p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">You sent</span>
              <span className="font-semibold">{formData.fromCurrency} {formData.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">They will receive</span>
              <span className="font-semibold">{formData.toCurrency} {transferResult.convertedAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fee</span>
              <span>${transferResult.fee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total paid</span>
              <span>${transferResult.totalAmount}</span>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="modern-card p-4 space-y-3">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Recipient Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Name</span>
                <span className="font-medium">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Country</span>
                <span className="font-medium">
                  {getCountryFlag(formData.recipientCountry)} {formData.recipientCountry}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">How they'll get it</span>
                <span className="font-medium flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  {getDeliveryMethodLabel(formData.deliveryMethod)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="modern-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Expected arrival</p>
                <p className="text-sm text-slate-600">{transferResult.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onTrackTransfer}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Check Status
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Send Another Transfer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
