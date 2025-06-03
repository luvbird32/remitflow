
export interface TransferFormData {
  amount: string
  recipientName: string
  recipientEmail: string
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
  accountNumber: string
  bankName: string
  cardNumber: string
  cardIssuer: string
  mobileNumber: string
  mobileProvider: string
  // Payment method fields for the final step
  paymentCardNumber?: string
  paymentExpiry?: string
  paymentCvv?: string
  paymentName?: string
}

export interface FormErrors {
  amount?: string
  recipientName?: string
  recipientEmail?: string
  recipientCountry?: string
  deliveryMethod?: string
  accountNumber?: string
  bankName?: string
  cardNumber?: string
  cardIssuer?: string
  mobileNumber?: string
  mobileProvider?: string
  paymentCardNumber?: string
  paymentExpiry?: string
  paymentCvv?: string
  paymentName?: string
  general?: string
}

export interface ConversionResult {
  convertedAmount: string
  rate: number
}
