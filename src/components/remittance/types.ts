
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
  general?: string
}
