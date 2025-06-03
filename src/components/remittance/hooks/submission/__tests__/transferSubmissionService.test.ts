
import { TransferSubmissionService } from '../transferSubmissionService';
import { TransferFormData } from '../../../types';

// Mock dependencies
jest.mock('@/services/apiService', () => ({
  ApiService: {
    createTransfer: jest.fn()
  }
}));

jest.mock('../../../services/transferProcessingService', () => ({
  TransferProcessingService: {
    simulateTransferProcessing: jest.fn()
  }
}));

jest.mock('../../../utils/transferStorageUtils', () => ({
  TransferStorageUtils: {
    storeTransferInHistory: jest.fn()
  }
}));

describe('TransferSubmissionService', () => {
  const mockFormData: TransferFormData = {
    amount: '100',
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    recipientName: 'John Doe',
    recipientEmail: 'john@example.com',
    recipientCountry: 'GB',
    deliveryMethod: 'bank',
    accountNumber: '12345678',
    bankName: 'Test Bank',
    cardNumber: '',
    cardIssuer: '',
    mobileNumber: '',
    mobileProvider: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  it('should successfully submit transfer via API', async () => {
    const { ApiService } = require('@/services/apiService');
    const mockResult = {
      id: 'TXN12345678',
      status: 'pending',
      amount: '100',
      currency: 'USD'
    };
    
    ApiService.createTransfer.mockResolvedValue(mockResult);

    const result = await TransferSubmissionService.submitTransfer(mockFormData);

    expect(ApiService.createTransfer).toHaveBeenCalledWith(mockFormData);
    expect(result).toEqual(mockResult);
    expect(console.log).toHaveBeenCalledWith('Submitting transfer with data:', mockFormData);
    expect(console.log).toHaveBeenCalledWith('Transfer API response:', mockResult);
  });

  it('should fallback to simulation when API fails', async () => {
    const { ApiService } = require('@/services/apiService');
    const { TransferProcessingService } = require('../../../services/transferProcessingService');
    
    ApiService.createTransfer.mockRejectedValue(new Error('Network error'));
    
    const mockSimulationResult = {
      id: 'TXN87654321',
      status: 'pending',
      amount: '100',
      currency: 'USD'
    };
    
    TransferProcessingService.simulateTransferProcessing.mockResolvedValue(mockSimulationResult);

    const result = await TransferSubmissionService.submitTransfer(mockFormData);

    expect(ApiService.createTransfer).toHaveBeenCalledWith(mockFormData);
    expect(TransferProcessingService.simulateTransferProcessing).toHaveBeenCalledWith(mockFormData);
    expect(result).toEqual(mockSimulationResult);
    expect(console.log).toHaveBeenCalledWith('Backend unavailable, simulating transfer processing');
    expect(console.error).toHaveBeenCalledWith('API Error:', expect.any(Error));
  });

  it('should store transfer in history when successful', async () => {
    const { ApiService } = require('@/services/apiService');
    const { TransferStorageUtils } = require('../../../utils/transferStorageUtils');
    
    const mockResult = {
      id: 'TXN12345678',
      status: 'pending'
    };
    
    ApiService.createTransfer.mockResolvedValue(mockResult);

    await TransferSubmissionService.submitTransfer(mockFormData);

    expect(TransferStorageUtils.storeTransferInHistory).toHaveBeenCalledWith(mockFormData, mockResult);
  });
});
