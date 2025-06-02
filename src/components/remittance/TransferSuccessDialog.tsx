
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Copy } from "lucide-react"
import { TransferFormData } from './types'
import { currencies, countries, calculateConvertedAmount, calculateFee } from './transferUtils'

interface TransferSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  formData: TransferFormData
}

export function TransferSuccessDialog({ isOpen, onClose, formData }: TransferSuccessDialogProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const convertedAmount = calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  
  // Generate a mock transfer reference
  const transferRef = `TXN${Date.now().toString().slice(-8)}`

  const copyReference = () => {
    navigator.clipboard.writeText(transferRef)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-green-700">
            Transfer Initiated Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your money transfer has been submitted and is being processed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Transfer Summary */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-green-700">
                  {fromCurrencyData?.symbol}{formData.amount}
                </span>
                <ArrowRight className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-700">
                  {toCurrencyData?.symbol}{convertedAmount}
                </span>
              </div>
              <div className="text-sm text-green-600">
                to {selectedCountry?.flag} {selectedCountry?.name}
              </div>
            </div>
          </div>

          {/* Transfer Reference */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transfer Reference</p>
                <p className="font-mono font-bold text-gray-900">{transferRef}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copyReference}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">What happens next?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• We'll send you email updates on the transfer status</li>
              <li>• The recipient will be notified when funds are available</li>
              <li>• You can track your transfer anytime using the reference number</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Send Another Transfer
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Track Transfer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
