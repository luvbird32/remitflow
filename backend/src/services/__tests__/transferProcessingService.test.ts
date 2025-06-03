
import { TransferProcessingService } from '../transferProcessingService';

describe('TransferProcessingService', () => {
  const mockFormData = {
    amount: '100',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipientName: 'John Doe',
    recipientEmail: 'john@example.com',
    recipientCountry: 'GB',
    deliveryMethod: 'bank'
  };

  describe('simulateTransferProcessing', () => {
    it('should simulate transfer processing successfully', async () => {
      const result = await TransferProcessingService.simulateTransferProcessing(mockFormData);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('status', 'pending');
      expect(result).toHaveProperty('amount', 100);
      expect(result).toHaveProperty('currency', 'USD');
      expect(result).toHaveProperty('recipientName', 'John Doe');
      expect(result).toHaveProperty('estimatedDelivery');
      expect(result.id).toMatch(/^TRF\d{6}$/);
    });

    it('should generate unique transfer IDs', async () => {
      const result1 = await TransferProcessingService.simulateTransferProcessing(mockFormData);
      const result2 = await TransferProcessingService.simulateTransferProcessing(mockFormData);
      
      expect(result1.id).not.toBe(result2.id);
    });
  });

  describe('generateTransferId', () => {
    it('should generate valid transfer ID format', () => {
      const id = TransferProcessingService.generateTransferId();
      expect(id).toMatch(/^TRF\d{6}$/);
    });

    it('should generate unique IDs', () => {
      const id1 = TransferProcessingService.generateTransferId();
      const id2 = TransferProcessingService.generateTransferId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('calculateEstimatedDelivery', () => {
    it('should return correct delivery estimates for different methods', () => {
      expect(TransferProcessingService.calculateEstimatedDelivery('bank')).toBe('1-3 business days');
      expect(TransferProcessingService.calculateEstimatedDelivery('cash')).toBe('Minutes');
      expect(TransferProcessingService.calculateEstimatedDelivery('wallet')).toBe('Minutes');
      expect(TransferProcessingService.calculateEstimatedDelivery('unknown')).toBe('1-3 business days');
    });
  });
});
