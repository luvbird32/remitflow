
import { Input } from "@/components/ui/input"

interface NewCardFieldsProps {
  onFieldChange: (field: string, value: string) => void
}

export function NewCardFields({ onFieldChange }: NewCardFieldsProps) {
  return (
    <div className="space-y-6 mt-6 p-4 border-t">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="form-label">Card Number</label>
          <Input
            placeholder="1234 5678 9012 3456"
            className="form-input h-12"
            onChange={(e) => onFieldChange('paymentCardNumber', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="form-label">Expiry Date</label>
          <Input
            placeholder="MM/YY"
            className="form-input h-12"
            onChange={(e) => onFieldChange('paymentExpiry', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="form-label">CVV</label>
          <Input
            placeholder="123"
            className="form-input h-12"
            onChange={(e) => onFieldChange('paymentCvv', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="form-label">Cardholder Name</label>
          <Input
            placeholder="John Doe"
            className="form-input h-12"
            onChange={(e) => onFieldChange('paymentName', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
