
import { renderHook, act } from '@testing-library/react';
import { useTrackTransfer } from '../../TrackTransfer/useTrackTransfer';

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useTrackTransfer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('[]');
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTrackTransfer());
    
    expect(result.current.trackingNumber).toBe('');
    expect(result.current.transferData).toBeNull();
    expect(result.current.isSearching).toBe(false);
    expect(result.current.notFound).toBe(false);
    expect(result.current.recentTransfers).toEqual([]);
  });

  it('should update tracking number', () => {
    const { result } = renderHook(() => useTrackTransfer());
    
    act(() => {
      result.current.setTrackingNumber('TRF123456');
    });
    
    expect(result.current.trackingNumber).toBe('TRF123456');
  });

  it('should load recent transfers from localStorage', () => {
    const mockTransfers = [
      { id: 'TRF001', amount: 100, recipientName: 'John' },
      { id: 'TRF002', amount: 200, recipientName: 'Jane' },
      { id: 'TRF003', amount: 300, recipientName: 'Bob' },
      { id: 'TRF004', amount: 400, recipientName: 'Alice' }
    ];
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTransfers));
    
    const { result } = renderHook(() => useTrackTransfer());
    
    // Should only show last 3 transfers
    expect(result.current.recentTransfers).toHaveLength(3);
    expect(result.current.recentTransfers[0].id).toBe('TRF001');
  });
});
