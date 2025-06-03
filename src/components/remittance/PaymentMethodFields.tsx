
import { TransferFormData, FormErrors } from './types'
import { BankTransferFields } from './PaymentMethodFields/BankTransferFields'
import { CardPaymentFields } from './PaymentMethodFields/CardPaymentFields'
import { WalletPaymentFields } from './PaymentMethodFields/WalletPaymentFields'

interface PaymentMethodFieldsProps {
  formData: TransferFormData
  onFieldChange: (field: string, value: string) => void
  errors: FormErrors
}

export function PaymentMethodFields({ formData, onFieldChange, errors }: PaymentMethodFieldsProps) {
  if (!formData.deliveryMethod) {
    return null
  }

  switch (formData.deliveryMethod) {
    case 'bank':
      return <BankTransferFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    case 'card':
      return <CardPaymentFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    case 'wallet':
      return <WalletPaymentFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    default:
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-600">Please select how you want the money to be delivered</p>
        </div>
      )
  }
}
