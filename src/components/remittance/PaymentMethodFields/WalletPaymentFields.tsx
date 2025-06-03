
import { Input } from "@/components/ui/input"
import { AlertCircle, Smartphone } from "lucide-react"
import { TransferFormData, FormErrors } from '../types'

interface WalletPaymentFieldsProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function WalletPaymentFields({ formData, onFieldChange, errors }: WalletPaymentFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="form-label">
          <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Smartphone className="h-3 w-3 text-white" />
          </div>
          Mobile Number
        </label>
        <Input
          placeholder="Enter mobile number"
          value={formData.mobileNumber}
          onChange={(e) => onFieldChange('mobileNumber', e.target.value)}
          className={`form-input h-14 text-lg ${errors.mobileNumber ? "border-red-500 focus:ring-red-100" : ""}`}
        />
        {errors.mobileNumber && (
          <div className="modern-card p-3 border-red-200 bg-red-50/80">
            <p className="text-red-600 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.mobileNumber}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <label className="form-label">
          Mobile Provider
        </label>
        <Input
          placeholder="Enter mobile provider (e.g., M-Pesa, MTN)"
          value={formData.mobileProvider}
          onChange={(e) => onFieldChange('mobileProvider', e.target.value)}
          className={`form-input h-14 text-lg ${errors.mobileProvider ? "border-red-500 focus:ring-red-100" : ""}`}
        />
        {errors.mobileProvider && (
          <div className="modern-card p-3 border-red-200 bg-red-50/80">
            <p className="text-red-600 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.mobileProvider}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
