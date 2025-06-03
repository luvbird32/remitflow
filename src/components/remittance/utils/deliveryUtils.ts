
export const deliveryMethodLabels = {
  bank: "Bank Transfer",
  card: "Debit Card",
  wallet: "Mobile Wallet"
}

export const deliveryTimeframes = {
  bank: "1-3 business days",
  card: "1-2 hours", 
  wallet: "Within minutes"
}

export const getEstimatedDelivery = (deliveryMethod: string): string => {
  return deliveryTimeframes[deliveryMethod as keyof typeof deliveryTimeframes] || "Unknown"
}
