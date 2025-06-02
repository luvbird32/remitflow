
import { Input } from "@/components/ui/input"
import { AlertCircle, CreditCard, Building, Smartphone } from "lucide-react"
import { TransferFormData, FormErrors } from './types'

interface PaymentMethodFieldsProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function PaymentMethodFields({ formData, onFieldChange, errors }: PaymentMethodFieldsProps) {
  switch (formData.deliveryMethod) {
    case 'bank':
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="form-label">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-3 w-3 text-white" />
              </div>
              Bank Name
            </label>
            <Input
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={(e) => onFieldChange('bankName', e.target.value)}
              className={`form-input h-14 text-lg ${errors.bankName ? "border-red-500 focus:ring-red-100" : ""}`}
            />
            {errors.bankName && (
              <div className="modern-card p-3 border-red-200 bg-red-50/80">
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.bankName}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <label className="form-label">
              Account Number
            </label>
            <Input
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={(e) => onFieldChange('accountNumber', e.target.value)}
              className={`form-input h-14 text-lg ${errors.accountNumber ? "border-red-500 focus:ring-red-100" : ""}`}
            />
            {errors.accountNumber && (
              <div className="modern-card p-3 border-red-200 bg-red-50/80">
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.accountNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    
    case 'card':
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
    
    case 'wallet':
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
    
    default:
      return null
  }
}
