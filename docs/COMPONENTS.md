
# Component Documentation

This document provides detailed information about the RemitFlow component architecture, including newly refactored components and their usage patterns.

## 📁 Component Organization

### Transfer Form Components

#### Core Form Components

**FormLayout**
```typescript
interface FormLayoutProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
}
```
Provides the main form wrapper with submission handling.

**FormErrorDisplay**
```typescript
interface FormErrorDisplayProps {
  errors: FormErrors
}
```
Centralized error display component for form-wide errors.

**FormStep**
```typescript
interface FormStepProps {
  stepNumber: number
  title: string
  description: string
  children: ReactNode
  showArrow?: boolean
  isHighlighted?: boolean
  isVisible?: boolean
}
```
Generic step wrapper that combines step indicator and container.

**StepIndicator**
```typescript
interface StepIndicatorProps {
  stepNumber: number
  title: string
  description: string
}
```
Displays step number, title, and description.

**StepContainer**
```typescript
interface StepContainerProps {
  children: ReactNode
  showArrow?: boolean
  isHighlighted?: boolean
}
```
Styled container for step content with optional arrow and highlighting.

#### Step Management

**StepVisibilityManager**
```typescript
interface StepVisibilityManagerProps {
  formData: TransferFormData
}

// Returns:
interface StepVisibility {
  hasBasicInfo: boolean
  hasDeliveryMethod: boolean
  showPaymentDetails: boolean
  showReviewStep: boolean
}
```
Hook that manages which steps should be visible based on form data.

### Payment Section Components

#### Payment Section Structure

**PaymentSectionContainer**
```typescript
interface PaymentSectionContainerProps {
  children: ReactNode
}
```
Main container for payment section with consistent styling.

**PaymentSectionHeader**
```typescript
interface PaymentSectionHeaderProps {
  title: string
  description: string
}
```
Header component for payment section with title and description.

**PaymentSectionContent**
```typescript
interface PaymentSectionContentProps {
  formData: TransferFormData
  showPaymentFields: boolean
  setShowPaymentFields: (show: boolean) => void
  onPaymentFieldChange: (field: string, value: string) => void
  isSubmitting: boolean
  errors: FormErrors
}
```
Main content component that orchestrates payment method selection.

#### Payment Method Components

**PaymentMethodSelector**
```typescript
interface PaymentMethodSelectorProps {
  savedCards: SavedCard[]
  selectedCard: string | null
  useNewCard: boolean
  showPaymentFields: boolean
  onCardSelection: (cardId: string) => void
  onUseNewCard: () => void
  onFieldChange: (field: string, value: string) => void
}
```
Component for selecting between saved cards and new card entry.

**SavedCardItem**
```typescript
interface SavedCardItemProps {
  card: SavedCard
  isSelected: boolean
  onSelect: () => void
}
```
Individual saved card display and selection component.

**NewCardOption**
```typescript
interface NewCardOptionProps {
  isSelected: boolean
  onSelect: () => void
}
```
Option to use a new card instead of saved cards.

**NewCardFields**
```typescript
interface NewCardFieldsProps {
  onFieldChange: (field: string, value: string) => void
}
```
Form fields for entering new card details.

**FallbackPaymentForm**
```typescript
interface FallbackPaymentFormProps {
  showPaymentFields: boolean
  isSubmitting: boolean
  onShowPaymentFields: () => void
  onFieldChange: (field: string, value: string) => void
}
```
Fallback payment form when no saved cards are available.

#### Payment Logic Hooks

**usePaymentMethodManager**
```typescript
interface PaymentMethodManager {
  savedCards: SavedCard[]
  selectedCard: string | null
  useNewCard: boolean
  handleCardSelection: (cardId: string) => void
  handleUseNewCard: () => void
}
```
Hook managing payment method selection logic.

### Delivery Method Components

**DeliveryMethodHeader**
```typescript
interface DeliveryMethodHeaderProps {
  stepNumber?: number
}
```
Header component for delivery method step.

## 🎯 Usage Patterns

### Basic Form Step Pattern

```tsx
import { FormStep } from './TransferForm/FormStep'

<FormStep
  stepNumber={1}
  title="Step Title"
  description="Step description"
  showArrow={false}
  isHighlighted={false}
  isVisible={true}
>
  {/* Step content */}
</FormStep>
```

### Payment Section Pattern

```tsx
import { PaymentSectionContainer } from './PaymentSection/PaymentSectionContainer'
import { PaymentSectionHeader } from './PaymentSection/PaymentSectionHeader'
import { PaymentSectionContent } from './PaymentSection/PaymentSectionContent'

<PaymentSectionContainer>
  <PaymentSectionHeader 
    title="Payment Method"
    description="Choose how you'd like to pay"
  />
  <PaymentSectionContent
    formData={formData}
    showPaymentFields={showFields}
    setShowPaymentFields={setShowFields}
    onPaymentFieldChange={handleFieldChange}
    isSubmitting={isSubmitting}
    errors={errors}
  />
</PaymentSectionContainer>
```

### Step Visibility Pattern

```tsx
import { useStepVisibility } from './StepVisibilityManager'

const { hasBasicInfo, showPaymentDetails, showReviewStep } = useStepVisibility({ formData })

return (
  <>
    <AmountDestinationStep />
    {hasBasicInfo && <DeliveryMethodStep />}
    {showPaymentDetails && <PaymentDetailsStep />}
    {showReviewStep && <ReviewStep />}
  </>
)
```

## 🧩 Component Composition

### Transfer Form Composition

```tsx
<FormLayout onSubmit={handleSubmit}>
  <AmountDestinationStepContainer />
  
  {hasBasicInfo && (
    <DeliveryMethodStepContainer />
  )}
  
  {showPaymentDetails && (
    <PaymentDetailsStepContainer />
  )}
  
  {showReviewStep && (
    <ReviewStepContainer />
  )}
  
  <FormErrorDisplay errors={errors} />
</FormLayout>
```

### Payment Section Composition

```tsx
<PaymentSectionContainer>
  <PaymentSectionHeader 
    title="Payment Method"
    description="Secure payment processing"
  />
  
  <PaymentSectionContent
    formData={formData}
    showPaymentFields={showPaymentFields}
    setShowPaymentFields={setShowPaymentFields}
    onPaymentFieldChange={handlePaymentFieldChange}
    isSubmitting={isSubmitting}
    errors={errors}
  />
</PaymentSectionContainer>
```

## 🎨 Styling Conventions

### CSS Classes

- **Container classes**: `modern-card`, `p-6`, `p-8`
- **Step indicators**: `step-indicator`
- **Highlight states**: `border-coral-500`, `bg-coral-50`
- **Interactive states**: `hover:border-gray-300`, `cursor-pointer`

### Responsive Design

Components use Tailwind's responsive prefixes:
- `md:` for tablet breakpoints
- `lg:` for desktop breakpoints
- Mobile-first approach with base classes

## 🔧 Development Guidelines

### Creating New Components

1. **Keep components small and focused** (< 100 lines)
2. **Use TypeScript interfaces** for all props
3. **Follow naming conventions** (PascalCase for components)
4. **Include proper error boundaries** where needed
5. **Use composition over inheritance**

### Component Testing

```tsx
import { render, screen } from '@testing-library/react'
import { FormStep } from './FormStep'

test('renders step with title and description', () => {
  render(
    <FormStep stepNumber={1} title="Test Step" description="Test description">
      <div>Content</div>
    </FormStep>
  )
  
  expect(screen.getByText('Test Step')).toBeInTheDocument()
  expect(screen.getByText('Test description')).toBeInTheDocument()
})
```

### Error Handling

Components should handle errors gracefully:

```tsx
export function PaymentSectionContent({ errors, ...props }) {
  if (errors.payment) {
    return <ErrorDisplay message={errors.payment} />
  }
  
  // Normal rendering...
}
```

## 📚 Migration Guide

### From Old Components

If you're migrating from older, monolithic components:

1. **Extract reusable logic** into custom hooks
2. **Split large components** into smaller, focused ones
3. **Use composition** instead of prop drilling
4. **Implement error boundaries** for better error handling

### Example Migration

```tsx
// Old: Large monolithic component
function LargeTransferForm() {
  // 200+ lines of JSX and logic
}

// New: Composed smaller components
function TransferForm() {
  return (
    <FormLayout onSubmit={handleSubmit}>
      <AmountDestinationStepContainer />
      <DeliveryMethodStepContainer />
      <PaymentDetailsStepContainer />
      <ReviewStepContainer />
    </FormLayout>
  )
}
```

This component architecture provides better maintainability, testability, and reusability while following modern React patterns and best practices.
