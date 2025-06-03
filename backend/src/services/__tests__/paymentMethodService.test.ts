
import { PaymentMethodService } from '../paymentMethodService';

describe('PaymentMethodService', () => {
  describe('getSavedCards', () => {
    it('should return saved cards', () => {
      const cards = PaymentMethodService.getSavedCards();
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveProperty('id', 'card_1');
      expect(cards[0]).toHaveProperty('isDefault', true);
    });
  });

  describe('getDefaultCard', () => {
    it('should return the default card', () => {
      const defaultCard = PaymentMethodService.getDefaultCard();
      expect(defaultCard).toBeTruthy();
      expect(defaultCard?.isDefault).toBe(true);
      expect(defaultCard?.id).toBe('card_1');
    });
  });

  describe('validateCard', () => {
    it('should validate correct card numbers', () => {
      expect(PaymentMethodService.validateCard('1234567890123456')).toBe(true);
      expect(PaymentMethodService.validateCard('1234 5678 9012 3456')).toBe(true);
    });

    it('should reject invalid card numbers', () => {
      expect(PaymentMethodService.validateCard('123')).toBe(false);
      expect(PaymentMethodService.validateCard('abcd1234567890123456')).toBe(false);
      expect(PaymentMethodService.validateCard('')).toBe(false);
    });
  });

  describe('formatCardNumber', () => {
    it('should format card number with spaces', () => {
      const formatted = PaymentMethodService.formatCardNumber('1234567890123456');
      expect(formatted).toBe('1234 5678 9012 3456');
    });

    it('should handle already formatted numbers', () => {
      const formatted = PaymentMethodService.formatCardNumber('1234 5678 9012 3456');
      expect(formatted).toBe('1234 5678 9012 3456');
    });
  });
});
