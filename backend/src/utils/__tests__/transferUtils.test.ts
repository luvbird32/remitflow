
import { TransferUtils } from '../transferUtils';

describe('TransferUtils', () => {
  describe('calculateFee', () => {
    it('should calculate correct fees for different amounts', () => {
      expect(TransferUtils.calculateFee(50)).toBe(2.99);
      expect(TransferUtils.calculateFee(100)).toBe(2.99);
      expect(TransferUtils.calculateFee(250)).toBe(4.99);
      expect(TransferUtils.calculateFee(500)).toBe(4.99);
      expect(TransferUtils.calculateFee(1000)).toBe(7.99);
    });

    it('should handle edge cases', () => {
      expect(TransferUtils.calculateFee(0)).toBe(2.99);
      expect(TransferUtils.calculateFee(100.01)).toBe(4.99);
      expect(TransferUtils.calculateFee(500.01)).toBe(7.99);
    });
  });

  describe('calculateExchangeRate', () => {
    it('should return mock exchange rates', () => {
      expect(TransferUtils.calculateExchangeRate('USD', 'EUR')).toBe(0.85);
      expect(TransferUtils.calculateExchangeRate('USD', 'GBP')).toBe(0.75);
      expect(TransferUtils.calculateExchangeRate('USD', 'NGN')).toBe(411.0);
      expect(TransferUtils.calculateExchangeRate('USD', 'USD')).toBe(1.0);
    });

    it('should return 1.0 for unknown currency pairs', () => {
      expect(TransferUtils.calculateExchangeRate('USD', 'XYZ')).toBe(1.0);
      expect(TransferUtils.calculateExchangeRate('ABC', 'EUR')).toBe(1.0);
    });
  });

  describe('convertCurrency', () => {
    it('should convert currency correctly', () => {
      expect(TransferUtils.convertCurrency(100, 'USD', 'EUR')).toBe(85);
      expect(TransferUtils.convertCurrency(100, 'USD', 'GBP')).toBe(75);
      expect(TransferUtils.convertCurrency(1, 'USD', 'NGN')).toBe(411);
    });

    it('should handle same currency conversion', () => {
      expect(TransferUtils.convertCurrency(100, 'USD', 'USD')).toBe(100);
    });
  });

  describe('validateTransferAmount', () => {
    it('should validate correct amounts', () => {
      expect(TransferUtils.validateTransferAmount(100)).toBe(true);
      expect(TransferUtils.validateTransferAmount(1)).toBe(true);
      expect(TransferUtils.validateTransferAmount(10000)).toBe(true);
    });

    it('should reject invalid amounts', () => {
      expect(TransferUtils.validateTransferAmount(0)).toBe(false);
      expect(TransferUtils.validateTransferAmount(-10)).toBe(false);
      expect(TransferUtils.validateTransferAmount(10001)).toBe(false);
    });
  });
});
