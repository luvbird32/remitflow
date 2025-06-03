
import { render, screen } from '@testing-library/react';
import { FeeBreakdown } from '../ReviewCompleteStep/FeeBreakdown';

const mockFormData = {
  amount: '100',
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  recipientName: 'John Doe',
  recipientEmail: 'john@example.com',
  recipientCountry: 'GB',
  deliveryMethod: 'bank'
};

describe('FeeBreakdown', () => {
  it('should render amount and fee correctly', () => {
    render(<FeeBreakdown formData={mockFormData} />);
    
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Fee')).toBeInTheDocument();
    expect(screen.getByText('Total you pay')).toBeInTheDocument();
  });

  it('should calculate fees correctly for different amounts', () => {
    const smallAmountData = { ...mockFormData, amount: '50' };
    const { rerender } = render(<FeeBreakdown formData={smallAmountData} />);
    expect(screen.getByText('$2.99')).toBeInTheDocument();

    const mediumAmountData = { ...mockFormData, amount: '250' };
    rerender(<FeeBreakdown formData={mediumAmountData} />);
    expect(screen.getByText('$4.99')).toBeInTheDocument();

    const largeAmountData = { ...mockFormData, amount: '1000' };
    rerender(<FeeBreakdown formData={largeAmountData} />);
    expect(screen.getByText('$7.99')).toBeInTheDocument();
  });

  it('should display total amount correctly', () => {
    render(<FeeBreakdown formData={mockFormData} />);
    expect(screen.getByText('$102.99')).toBeInTheDocument();
  });
});
