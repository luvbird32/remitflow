
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

export interface Country {
  code: string
  name: string
  currency: string
  flag: string
  deliveryMethods: string[]
}

export interface TransferFormData {
  amount: string
  recipientName: string
  recipientEmail: string
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
  // Bank transfer fields
  accountNumber: string
  bankName: string
  // Debit card fields
  cardNumber: string
  cardIssuer: string
  // Mobile money fields
  mobileNumber: string
  mobileProvider: string
}

export interface FormErrors {
  [key: string]: string
}
