
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
  switch (formData.deliveryMethod) {
    case 'bank':
      return <BankTransferFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    case 'card':
      return <CardPaymentFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    case 'wallet':
      return <WalletPaymentFields formData={formData} onFieldChange={onFieldChange} errors={errors} />
    
    default:
      return null
  }
}
