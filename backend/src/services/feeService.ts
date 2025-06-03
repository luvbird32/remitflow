
export class FeeService {
  static calculateBaseFee(amount: string): number {
    if (!amount) return 0
    const transferAmount = parseFloat(amount)
    
    if (transferAmount <= 100) return 2.99
    else if (transferAmount <= 500) return 4.99
    else return 7.99
  }

  static calculateTotalFee(amount: string, deliveryMethod: string): number {
    const baseFee = this.calculateBaseFee(amount)
    const { DeliveryService } = require('./deliveryService')
    const deliveryFee = DeliveryService.calculateDeliveryFee(deliveryMethod)
    
    return baseFee + deliveryFee
  }

  static calculateTotalAmount(amount: string, deliveryMethod: string): string {
    const transferAmount = parseFloat(amount) || 0
    const totalFee = this.calculateTotalFee(amount, deliveryMethod)
    return (transferAmount + totalFee).toFixed(2)
  }
}
