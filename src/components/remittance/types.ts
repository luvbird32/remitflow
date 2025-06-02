
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
  recipientEmail: string
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
}

export interface FormErrors {
  [key: string]: string
}
