
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Copy, Clock, CreditCard } from "lucide-react"
import { TransferFormData } from './types'
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'

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
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)
  
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
            Transfer Sent Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your money transfer to {formData.recipientName} has been initiated and is being processed.
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
                to {formData.recipientName} in {selectedCountry?.flag} {selectedCountry?.name}
              </div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                Expected delivery: {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-gray-900 mb-3">Transaction Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount sent:</span>
                <span className="font-medium">{fromCurrencyData?.symbol}{formData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transfer fee:</span>
                <span className="font-medium">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Total charged:</span>
                <span className="font-medium">{fromCurrencyData?.symbol}{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange rate:</span>
                <span className="font-medium">1 {formData.fromCurrency} = {toCurrencyData?.rate} {formData.toCurrency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery method:</span>
                <span className="font-medium flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  {deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}
                </span>
              </div>
            </div>
          </div>

          {/* Transfer Reference */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Transfer Reference</p>
                <p className="font-mono font-bold text-blue-900">{transferRef}</p>
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
              <li>• {formData.recipientName} will be notified when funds are available</li>
              <li>• You can track your transfer anytime using the reference number</li>
              <li>• Funds will be available within {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</li>
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
