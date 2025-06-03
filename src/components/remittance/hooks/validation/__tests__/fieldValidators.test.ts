
import { fieldValidators } from '../fieldValidators';

describe('fieldValidators', () => {
  describe('amount validator', () => {
    it('should validate correct amounts', () => {
      expect(fieldValidators.amount('100')).toEqual({ isValid: true });
      expect(fieldValidators.amount('1')).toEqual({ isValid: true });
      expect(fieldValidators.amount('10000')).toEqual({ isValid: true });
    });

    it('should reject invalid amounts', () => {
      expect(fieldValidators.amount('')).toEqual({ 
        isValid: false, 
        error: 'Please enter an amount' 
      });
      expect(fieldValidators.amount('0')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid amount' 
      });
      expect(fieldValidators.amount('abc')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid amount' 
      });
      expect(fieldValidators.amount('0.5')).toEqual({ 
        isValid: false, 
        error: 'Minimum amount is $1' 
      });
      expect(fieldValidators.amount('10001')).toEqual({ 
        isValid: false, 
        error: 'Maximum amount is $10,000' 
      });
    });
  });

  describe('recipientName validator', () => {
    it('should validate correct names', () => {
      expect(fieldValidators.recipientName('John Doe')).toEqual({ isValid: true });
      expect(fieldValidators.recipientName('AB')).toEqual({ isValid: true });
    });

    it('should reject invalid names', () => {
      expect(fieldValidators.recipientName('')).toEqual({ 
        isValid: false, 
        error: 'Please enter the recipient name' 
      });
      expect(fieldValidators.recipientName('A')).toEqual({ 
        isValid: false, 
        error: 'Name must be at least 2 characters' 
      });
    });
  });

  describe('recipientEmail validator', () => {
    it('should validate correct emails', () => {
      expect(fieldValidators.recipientEmail('test@example.com')).toEqual({ isValid: true });
      expect(fieldValidators.recipientEmail('')).toEqual({ isValid: true }); // Email is optional
    });

    it('should reject invalid emails', () => {
      expect(fieldValidators.recipientEmail('invalid-email')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid email address' 
      });
      expect(fieldValidators.recipientEmail('test@')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid email address' 
      });
    });
  });

  describe('cardNumber validator', () => {
    it('should validate correct card numbers', () => {
      expect(fieldValidators.cardNumber('1234567890123456')).toEqual({ isValid: true });
      expect(fieldValidators.cardNumber('1234 5678 9012 3456')).toEqual({ isValid: true });
    });

    it('should reject invalid card numbers', () => {
      expect(fieldValidators.cardNumber('')).toEqual({ 
        isValid: false, 
        error: 'Card number is required' 
      });
      expect(fieldValidators.cardNumber('123')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid 16-digit card number' 
      });
      expect(fieldValidators.cardNumber('abcd1234567890123456')).toEqual({ 
        isValid: false, 
        error: 'Please enter a valid 16-digit card number' 
      });
    });
  });
});
