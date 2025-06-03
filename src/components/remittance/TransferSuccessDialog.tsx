
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Copy, Clock, CreditCard, Sparkles, Gift } from "lucide-react"
import { TransferFormData } from './types'
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'

/**
 * Props for the TransferSuccessDialog component
 */
interface TransferSuccessDialogProps {
  isOpen: boolean
  onClose: () => void
  formData: TransferFormData
  transferResult?: any
}

/**
 * Success dialog component displayed after successful transfer submission
 * @param isOpen - Whether the dialog is open
 * @param onClose - Callback function to close the dialog
 * @param formData - Transfer form data
 * @param transferResult - Result from the transfer API
 * @returns JSX element containing the success dialog
 */
export function TransferSuccessDialog({ isOpen, onClose, formData, transferResult }: TransferSuccessDialogProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const convertedAmount = calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)
  
  // Use transfer reference from API result or generate a mock one
  const transferRef = transferResult?.id || `TXN${Date.now().toString().slice(-8)}`

  /**
   * Copies the transfer reference to clipboard
   */
  const copyReference = () => {
    navigator.clipboard.writeText(transferRef)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md max-h-[85vh] modern-card border-none shadow-2xl overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 animate-scale-in">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-coral-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-lg font-bold gradient-text mb-1">
            Transfer Sent Successfully!
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm px-2">
            Your transfer to <span className="font-semibold text-slate-800">{formData.recipientName}</span> is being processed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {/* Transfer Summary */}
          <div className="modern-card p-3 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-700">
                    {fromCurrencyData?.symbol}{formData.amount}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">{formData.fromCurrency}</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-700">
                    {toCurrencyData?.symbol}{convertedAmount}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">{formData.toCurrency}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold text-sm">
                <span className="text-sm">{selectedCountry?.flag}</span>
                <span>to {formData.recipientName} in {selectedCountry?.name}</span>
              </div>
              <div className="flex items-center justify-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
                <Clock className="h-3 w-3 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">
                  {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="modern-card p-3 bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200">
            <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1">
              <Gift className="h-3 w-3" />
              Transaction Details
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center p-2 bg-white/80 rounded-lg">
                <span className="text-slate-600 font-medium text-xs">Amount sent:</span>
                <span className="font-bold text-slate-800 text-xs">{fromCurrencyData?.symbol}{formData.amount}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/80 rounded-lg">
                <span className="text-slate-600 font-medium text-xs">Transfer fee:</span>
                <span className="font-bold text-amber-600 text-xs">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-700 font-semibold text-xs">Total charged:</span>
                <span className="font-bold text-slate-800 text-xs">{fromCurrencyData?.symbol}{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/80 rounded-lg">
                <span className="text-slate-600 font-medium text-xs">Delivery method:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1 text-xs">
                  <CreditCard className="h-3 w-3" />
                  {deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}
                </span>
              </div>
            </div>
          </div>

          {/* Transfer Reference */}
          <div className="modern-card p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-teal-700 font-semibold mb-1 text-xs">Transfer Reference</p>
                <p className="font-mono font-bold text-sm text-teal-800 break-all">{transferRef}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={copyReference}
                className="btn-primary h-8 px-3 text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 h-10 text-sm font-semibold border-2 hover:bg-slate-50" 
              onClick={onClose}
            >
              Send Another
            </Button>
            <Button 
              className="btn-primary flex-1 h-10 text-sm font-semibold" 
              onClick={onClose}
            >
              Track Transfer
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
