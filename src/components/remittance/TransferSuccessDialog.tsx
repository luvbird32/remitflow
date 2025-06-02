
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
      <DialogContent className="max-w-lg modern-card border-none shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 animate-scale-in">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold gradient-text mb-3">
            Transfer Sent Successfully!
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-lg">
            Your money transfer to <span className="font-semibold text-slate-800">{formData.recipientName}</span> has been initiated and is being processed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-8">
          {/* Transfer Summary */}
          <div className="modern-card p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {fromCurrencyData?.symbol}{formData.amount}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">{formData.fromCurrency}</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ArrowRight className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {toCurrencyData?.symbol}{convertedAmount}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">{formData.toCurrency}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold">
                <span className="text-lg">{selectedCountry?.flag}</span>
                <span>to {formData.recipientName} in {selectedCountry?.name}</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 rounded-xl">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Expected delivery: {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="modern-card p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Transaction Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-xl">
                <span className="text-slate-600 font-medium">Amount sent:</span>
                <span className="font-bold text-slate-800">{fromCurrencyData?.symbol}{formData.amount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-xl">
                <span className="text-slate-600 font-medium">Transfer fee:</span>
                <span className="font-bold text-amber-600">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 font-semibold">Total charged:</span>
                <span className="font-bold text-slate-800">{fromCurrencyData?.symbol}{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-xl">
                <span className="text-slate-600 font-medium">Exchange rate:</span>
                <span className="font-semibold text-slate-800">1 {formData.fromCurrency} = {toCurrencyData?.rate} {formData.toCurrency}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-xl">
                <span className="text-slate-600 font-medium">Delivery method:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}
                </span>
              </div>
            </div>
          </div>

          {/* Transfer Reference */}
          <div className="modern-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-teal-700 font-semibold mb-1">Transfer Reference</p>
                <p className="font-mono font-bold text-xl text-teal-800">{transferRef}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={copyReference}
                className="btn-primary h-12 px-6"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="modern-card p-6 border-coral-200 bg-gradient-to-r from-coral-50 to-orange-50">
            <h4 className="font-bold text-slate-800 mb-4 text-lg">What happens next?</h4>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-medium">We'll send you email updates on the transfer status</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-medium">{formData.recipientName} will be notified when funds are available</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-medium">You can track your transfer anytime using the reference number</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-coral-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="font-medium">Funds will be available within {deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-slate-50" 
              onClick={onClose}
            >
              Send Another Transfer
            </Button>
            <Button 
              className="btn-primary flex-1 h-14 text-lg font-semibold" 
              onClick={onClose}
            >
              Track Transfer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
