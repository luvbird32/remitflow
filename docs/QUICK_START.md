# Quick Start Guide

Get up and running with RemitFlow in just a few minutes! This guide will walk you through the essential steps to start using the international money transfer platform.

## 🚀 5-Minute Setup

### Step 1: Installation

```bash
# Clone the repository
git clone https://github.com/your-org/remitflow.git
cd remitflow

# Install dependencies (using Bun - recommended)
bun install

# Or using npm
npm install
```

### Step 2: Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with basic configuration:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

### Step 3: Start Development Server

```bash
# Start frontend
bun run dev

# In another terminal, start backend (optional)
cd backend && npm run dev
```

### Step 4: Open Application

Visit `http://localhost:5173` in your browser. You should see the RemitFlow homepage!

## 📱 First Transfer

### Using the Demo

1. **Navigate to Transfer**: Click "Send Money" or go to the transfer page
2. **Enter Amount**: Try sending $100 USD
3. **Select Destination**: Choose Nigeria (NGN) as destination
4. **Choose Delivery**: Select "Bank Transfer"
5. **Add Recipient**: Fill in recipient details
6. **Review & Submit**: Complete the demo transfer

### Expected Flow

```
Amount & Destination → Delivery Method → Recipient Details → Review & Complete
```

## 🔍 Key Features Overview

### 💸 Money Transfers
- **Multi-currency support**: USD, EUR, GBP, NGN, KES, GHS, and more
- **Multiple delivery methods**: Bank transfer, debit card, mobile wallet
- **Real-time exchange rates**: Live currency conversion
- **Fee transparency**: Clear breakdown of all charges

### 📊 Exchange Calculator
- **Live rate comparison**: See current exchange rates
- **Amount preview**: Calculate conversion before sending
- **Rate alerts**: (Coming soon) Get notified of favorable rates

### 📈 Transfer Tracking
- **Real-time status**: Track your transfer progress
- **Status history**: See complete transfer timeline
- **Delivery confirmation**: Know when transfer is completed

### 📚 Transfer History
- **All transfers**: View your complete transfer history
- **Search & filter**: Find specific transfers quickly
- **Export data**: Download transfer records

## 🛠️ Development Quick Start

### Project Structure Overview

```
remitflow/
├── src/
│   ├── components/          # React components
│   │   ├── remittance/     # Transfer-related components
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── pages/              # Route pages
│   ├── services/           # API services
│   └── hooks/              # Custom React hooks
├── backend/                # Backend API (Node.js)
└── docs/                   # Documentation
```

### Adding a New Component

1. **Create component file**:
```bash
touch src/components/your-component/YourComponent.tsx
```

2. **Basic component structure**:
```tsx
import React from 'react';

interface YourComponentProps {
  title: string;
  onAction?: () => void;
}

const YourComponent: React.FC<YourComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Action
        </button>
      )}
    </div>
  );
};

export default YourComponent;
```

3. **Use the component**:
```tsx
import YourComponent from './components/your-component/YourComponent';

function App() {
  return (
    <YourComponent 
      title="Hello World" 
      onAction={() => alert('Action triggered!')} 
    />
  );
}
```

### Making API Calls

```typescript
import { apiService } from '../services/apiService';

// Get currencies
const currencies = await apiService.get('/currencies');

// Create transfer
const transfer = await apiService.post('/transfers', {
  amount: '100',
  fromCurrency: 'USD',
  toCurrency: 'NGN',
  // ... other transfer data
});

// Track transfer
const tracking = await apiService.get(`/tracking/${transferId}`);
```

### Using Custom Hooks

```tsx
import { useTransferFormState } from '../hooks/useTransferFormState';

const TransferForm = () => {
  const {
    formData,
    currentStep,
    nextStep,
    prevStep,
    updateFormData,
    submitTransfer
  } = useTransferFormState();

  return (
    <form onSubmit={submitTransfer}>
      {/* Form content */}
    </form>
  );
};
```

## 🎨 Styling with Tailwind

RemitFlow uses Tailwind CSS for styling. Here are common patterns:

### Layout
```tsx
<div className="container mx-auto px-4 py-8">
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
    {/* Content */}
  </div>
</div>
```

### Buttons
```tsx
{/* Primary button */}
<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
  Primary Action
</button>

{/* Secondary button */}
<button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg">
  Secondary Action
</button>
```

### Forms
```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Amount
  </label>
  <input 
    type="number"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter amount"
  />
</div>
```

## 🧪 Testing Your Changes

### Run Tests
```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run with coverage
bun test:coverage
```

### Manual Testing Checklist

- [ ] **Responsive design**: Test on mobile, tablet, desktop
- [ ] **Form validation**: Try invalid inputs
- [ ] **Error handling**: Test network failures
- [ ] **Loading states**: Check loading indicators
- [ ] **Navigation**: Verify all routes work

## 📱 Mobile Development

### Responsive Breakpoints
```css
/* Mobile first approach */
.container {
  @apply px-4;           /* Default: mobile */
  @apply md:px-6;        /* Tablet */
  @apply lg:px-8;        /* Desktop */
}
```

### Mobile-specific Components
```tsx
import { useMobile } from '../hooks/use-mobile';

const ResponsiveComponent = () => {
  const isMobile = useMobile();
  
  return (
    <div className={`${isMobile ? 'flex-col' : 'flex-row'} flex`}>
      {/* Responsive content */}
    </div>
  );
};
```

## 🔧 Common Tasks

### Add a New Currency
1. Update `backend/src/services/currencyService.ts`
2. Add currency to the `currencies` array
3. Test exchange rate calculations

### Add a New Country
1. Update `backend/src/services/countryService.ts`
2. Add country to the `countries` array
3. Specify available delivery methods

### Create a New Page
1. Create page component in `src/pages/`
2. Add route to router configuration
3. Update navigation menus

### Add Form Validation
```typescript
import { z } from 'zod';

const transferSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  recipientName: z.string().min(2, 'Name must be at least 2 characters'),
  recipientCountry: z.string().min(1, 'Country is required'),
});

type TransferData = z.infer<typeof transferSchema>;
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill
```

**Node version issues:**
```bash
# Use correct Node version
nvm use 18
```

**Dependency conflicts:**
```bash
# Clean install
rm -rf node_modules bun.lockb
bun install
```

**Build errors:**
```bash
# Check TypeScript errors
bun run type-check

# Check linting
bun run lint
```

## 📚 Next Steps

Now that you're up and running, explore these areas:

1. **[Architecture Guide](./ARCHITECTURE.md)**: Understand the system design
2. **[API Documentation](./API.md)**: Learn about available endpoints
3. **[Contributing Guide](./CONTRIBUTING.md)**: Start contributing to the project
4. **[Testing Guide](./TESTING.md)**: Learn testing best practices

## 💡 Tips for Success

### Development Workflow
1. **Start small**: Make incremental changes
2. **Test frequently**: Verify changes work as expected
3. **Use TypeScript**: Leverage type safety
4. **Follow conventions**: Maintain code consistency
5. **Document changes**: Update relevant documentation

### Best Practices
- **Mobile-first design**: Design for mobile, enhance for desktop
- **Accessibility**: Use semantic HTML and ARIA labels
- **Performance**: Optimize images and minimize bundle size
- **Security**: Validate inputs and sanitize data
- **Error handling**: Provide helpful error messages

## 🎉 Welcome to RemitFlow!

You're now ready to start building with RemitFlow! The platform provides a solid foundation for international money transfers with modern web technologies.

**Happy coding!** 🚀

---

Need help? Check our [Troubleshooting Guide](./TROUBLESHOOTING.md) or join our [Discord community](https://discord.gg/remitflow).
