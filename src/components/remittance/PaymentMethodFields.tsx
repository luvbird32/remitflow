
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Building className="h-4 w-4 inline mr-1" />
              Bank Name
            </label>
            <Input
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={(e) => onFieldChange('bankName', e.target.value)}
              className={errors.bankName ? "border-red-500" : ""}
            />
            {errors.bankName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.bankName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Account Number
            </label>
            <Input
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={(e) => onFieldChange('accountNumber', e.target.value)}
              className={errors.accountNumber ? "border-red-500" : ""}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.accountNumber}
              </p>
            )}
          </div>
        </div>
      )
    
    case 'card':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <CreditCard className="h-4 w-4 inline mr-1" />
              Card Number
            </label>
            <Input
              placeholder="Enter card number"
              value={formData.cardNumber}
              onChange={(e) => onFieldChange('cardNumber', e.target.value)}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.cardNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Card Issuer
            </label>
            <Input
              placeholder="Enter card issuer (e.g., Visa, Mastercard)"
              value={formData.cardIssuer}
              onChange={(e) => onFieldChange('cardIssuer', e.target.value)}
              className={errors.cardIssuer ? "border-red-500" : ""}
            />
            {errors.cardIssuer && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.cardIssuer}
              </p>
            )}
          </div>
        </div>
      )
    
    case 'wallet':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Smartphone className="h-4 w-4 inline mr-1" />
              Mobile Number
            </label>
            <Input
              placeholder="Enter mobile number"
              value={formData.mobileNumber}
              onChange={(e) => onFieldChange('mobileNumber', e.target.value)}
              className={errors.mobileNumber ? "border-red-500" : ""}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.mobileNumber}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mobile Provider
            </label>
            <Input
              placeholder="Enter mobile provider (e.g., M-Pesa, MTN)"
              value={formData.mobileProvider}
              onChange={(e) => onFieldChange('mobileProvider', e.target.value)}
              className={errors.mobileProvider ? "border-red-500" : ""}
            />
            {errors.mobileProvider && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.mobileProvider}
              </p>
            )}
          </div>
        </div>
      )
    
    default:
      return null
  }
}
