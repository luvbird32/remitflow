
import { Input } from "@/components/ui/input"
import { AlertCircle, CreditCard } from "lucide-react"
import { TransferFormData, FormErrors } from '../types'

interface CardPaymentFieldsProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function CardPaymentFields({ formData, onFieldChange, errors }: CardPaymentFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="form-label">
          <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <CreditCard className="h-3 w-3 text-white" />
          </div>
          Card Number
        </label>
        <Input
          placeholder="Enter card number"
          value={formData.cardNumber}
          onChange={(e) => onFieldChange('cardNumber', e.target.value)}
          className={`form-input h-14 text-lg ${errors.cardNumber ? "border-red-500 focus:ring-red-100" : ""}`}
        />
        {errors.cardNumber && (
          <div className="modern-card p-3 border-red-200 bg-red-50/80">
            <p className="text-red-600 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.cardNumber}
            </p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <label className="form-label">
          Card Issuer
        </label>
        <Input
          placeholder="Enter card issuer (e.g., Visa, Mastercard)"
          value={formData.cardIssuer}
          onChange={(e) => onFieldChange('cardIssuer', e.target.value)}
          className={`form-input h-14 text-lg ${errors.cardIssuer ? "border-red-500 focus:ring-red-100" : ""}`}
        />
        {errors.cardIssuer && (
          <div className="modern-card p-3 border-red-200 bg-red-50/80">
            <p className="text-red-600 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {errors.cardIssuer}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
