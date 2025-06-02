
/**
 * Currency interface representing exchange rate information
 */
export interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

/**
 * Country interface with delivery method support
 */
export interface Country {
  code: string
  name: string
  currency: string
  flag: string
  deliveryMethods: string[]
}

/**
 * Transfer form data interface containing all transfer information
 */
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

/**
 * Form validation errors interface
 */
export interface FormErrors {
  [key: string]: string
}
