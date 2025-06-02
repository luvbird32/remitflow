
import { TransferFormData } from './types'
import { currencies, countries, deliveryMethodLabels, deliveryTimeframes, calculateConvertedAmount, calculateFee } from './transferUtils'

interface TransferSummaryProps {
  formData: TransferFormData
}

export function TransferSummary({ formData }: TransferSummaryProps) {
  const fromCurrencyData = currencies.find(c => c.code === formData.fromCurrency)
  const toCurrencyData = currencies.find(c => c.code === formData.toCurrency)
  const selectedCountry = countries.find(c => c.code === formData.recipientCountry)
  const convertedAmount = calculateConvertedAmount(formData.amount, formData.fromCurrency, formData.toCurrency)
  const fee = calculateFee(formData.amount, formData.deliveryMethod)
  const totalAmount = (parseFloat(formData.amount) + fee).toFixed(2)

  return (
    <div className="space-y-6">
      {/* Transfer Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-3">Transfer Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">You send:</span>
            <span className="font-medium">{fromCurrencyData?.symbol}{formData.amount} {formData.fromCurrency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Transfer fee:</span>
            <span className="font-medium">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-blue-700">Total amount:</span>
            <span className="font-medium">{fromCurrencyData?.symbol}{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Exchange rate:</span>
            <span className="font-medium">1 {formData.fromCurrency} = {toCurrencyData?.rate} {formData.toCurrency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">{formData.recipientName} receives:</span>
            <span className="font-medium text-green-600">{toCurrencyData?.symbol}{convertedAmount} {formData.toCurrency}</span>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Recipient Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{formData.recipientName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Country:</span>
            <span className="font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery method:</span>
            <span className="font-medium">{deliveryMethodLabels[formData.deliveryMethod as keyof typeof deliveryMethodLabels]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated delivery:</span>
            <span className="font-medium">{deliveryTimeframes[formData.deliveryMethod as keyof typeof deliveryTimeframes]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
