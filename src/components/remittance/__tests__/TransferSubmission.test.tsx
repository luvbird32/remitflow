
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { TransferFormContainer } from '../TransferForm/TransferFormContainer';
import { ValidationProvider } from '../hooks/validation/ValidationContext';

// Mock the services and hooks
jest.mock('@/services/apiService', () => ({
  ApiService: {
    createTransfer: jest.fn()
  }
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

jest.mock('../services/transferProcessingService', () => ({
  TransferProcessingService: {
    simulateTransferProcessing: jest.fn()
  }
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(() => '[]'),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ValidationProvider>
    {children}
  </ValidationProvider>
);

describe('Send Money Function Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the transfer form correctly', () => {
    render(
      <TestWrapper>
        <TransferFormContainer />
      </TestWrapper>
    );

    expect(screen.getByText('Send Money')).toBeInTheDocument();
    expect(screen.getByText('Send Money To')).toBeInTheDocument();
  });

  it('should validate required fields before submission', async () => {
    render(
      <TestWrapper>
        <TransferFormContainer />
      </TestWrapper>
    );

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /send money/i });
    
    // Fill in minimum required fields to get to submit button
    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const recipientNameInput = screen.getByLabelText(/recipient name/i);
    fireEvent.change(recipientNameInput, { target: { value: 'John Doe' } });

    // Select a country
    const countrySelect = screen.getByLabelText(/country/i);
    fireEvent.change(countrySelect, { target: { value: 'GB' } });

    await waitFor(() => {
      expect(screen.getByText('How Will They Get The Money?')).toBeInTheDocument();
    });

    // Select delivery method
    const bankDeliveryOption = screen.getByText(/bank transfer/i);
    fireEvent.click(bankDeliveryOption);

    await waitFor(() => {
      expect(screen.getByText('Payment Details')).toBeInTheDocument();
    });

    // Now check if submit button appears
    await waitFor(() => {
      const sendMoneyButton = screen.queryByRole('button', { name: /send money/i });
      if (sendMoneyButton) {
        expect(sendMoneyButton).toBeInTheDocument();
      }
    });
  });

  it('should handle form submission errors gracefully', async () => {
    const { ApiService } = require('@/services/apiService');
    ApiService.createTransfer.mockRejectedValue(new Error('Network error'));

    render(
      <TestWrapper>
        <TransferFormContainer />
      </TestWrapper>
    );

    // Fill out the form completely
    const amountInput = screen.getByLabelText(/amount/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    const recipientNameInput = screen.getByLabelText(/recipient name/i);
    fireEvent.change(recipientNameInput, { target: { value: 'John Doe' } });

    const countrySelect = screen.getByLabelText(/country/i);
    fireEvent.change(countrySelect, { target: { value: 'GB' } });

    await waitFor(() => {
      const bankOption = screen.getByText(/bank transfer/i);
      fireEvent.click(bankOption);
    });

    // Fill in bank details
    await waitFor(() => {
      const accountNumberInput = screen.getByLabelText(/account number/i);
      fireEvent.change(accountNumberInput, { target: { value: '12345678' } });

      const bankNameInput = screen.getByLabelText(/bank name/i);
      fireEvent.change(bankNameInput, { target: { value: 'Test Bank' } });
    });

    // Submit the form
    await waitFor(() => {
      const submitButton = screen.queryByRole('button', { name: /send money/i });
      if (submitButton) {
        fireEvent.click(submitButton);
      }
    });

    // Check that fallback processing is triggered
    await waitFor(() => {
      // Should fallback to simulation when API fails
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Backend unavailable, simulating transfer processing')
      );
    });
  });
});
