
import { Input } from "@/components/ui/input"
import { AlertCircle, Building } from "lucide-react"
import { TransferFormData, FormErrors } from '../types'

interface BankTransferFieldsProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function BankTransferFields({ formData, onFieldChange, errors }: BankTransferFieldsProps) {
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
}
