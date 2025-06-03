
export const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  wallet: "Mobile Wallet"
}

export const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "Within 30 minutes",
  wallet: "Within 15 minutes"
}

export const calculateFee = (amount: string, deliveryMethod: string): number => {
  const baseAmount = parseFloat(amount)
  switch (deliveryMethod) {
    case 'bank':
      return 0 // Free
    case 'card':
      return 1.99
    case 'wallet':
      return 0.99
    default:
      return 0
  }
}
