
# Architecture Overview

RemitFlow is built with a modern, scalable architecture designed for international money transfers. This document provides a comprehensive overview of the system architecture, design patterns, and technical decisions.

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   External      │
│   (React/TS)    │◄──►│   (Node.js/TS)  │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                      │                      │
├── UI Components      ├── REST API          ├── Exchange APIs
├── State Management   ├── Business Logic    ├── Payment Gateways
├── Routing           ├── Data Validation   ├── Notification APIs
└── HTTP Client       └── Security Layer    └── Compliance APIs
```

## 🎯 Frontend Architecture

### Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: TanStack Query + React Context
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── layout/          # Layout components
│   ├── remittance/      # Transfer-specific components
│   │   ├── TransferForm/           # Transfer form components
│   │   │   ├── FormLayout.tsx      # Form wrapper component
│   │   │   ├── FormErrorDisplay.tsx # Error display component
│   │   │   ├── StepIndicator.tsx   # Step indicator component
│   │   │   ├── StepContainer.tsx   # Step wrapper component
│   │   │   ├── FormStep.tsx        # Generic form step component
│   │   │   ├── StepVisibilityManager.tsx # Step visibility logic
│   │   │   └── steps/              # Individual step containers
│   │   ├── ReviewCompleteStep/     # Review and payment components
│   │   │   └── PaymentSection/     # Payment method components
│   │   │       ├── PaymentSectionHeader.tsx
│   │   │       ├── PaymentSectionContent.tsx
│   │   │       ├── PaymentSectionContainer.tsx
│   │   │       ├── PaymentMethodSelector.tsx
│   │   │       ├── SavedCardItem.tsx
│   │   │       ├── NewCardOption.tsx
│   │   │       ├── NewCardFields.tsx
│   │   │       ├── FallbackPaymentForm.tsx
│   │   │       └── PaymentMethodManager.tsx
│   │   └── DeliveryMethodStep/     # Delivery method components
│   └── auth/            # Authentication components
├── pages/               # Route-based page components
├── hooks/               # Custom React hooks
├── services/            # API services and HTTP clients
│   ├── api/            # Organized API services
│   │   ├── baseApiService.ts       # Core transfer operations
│   │   ├── dataApiService.ts       # Data operations (currencies, countries)
│   │   ├── transactionApiService.ts # Transaction operations
│   │   └── userManagementService.ts # User management operations
│   └── http/           # HTTP client infrastructure
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── config/              # Configuration files
```

### Component Architecture

```
┌─────────────────────────────────────────┐
│               App.tsx                   │
├─────────────────────────────────────────┤
│            Layout Components            │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Header    │  │    Sidebar      │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│              Page Components            │
│  ┌─────────────────────────────────────┐ │
│  │          Route Content              │ │
│  │  ┌─────────────┐ ┌───────────────┐  │ │
│  │  │  Transfer   │ │  Review &     │  │ │
│  │  │  Form Steps │ │  Payment      │  │ │
│  │  └─────────────┘ └───────────────┘  │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### New Form Architecture (Post-Refactoring)

The transfer form now follows a modular, step-based architecture:

```
TransferForm
├── FormLayout (form wrapper)
├── TransferFormSteps
│   ├── AmountDestinationStepContainer
│   ├── DeliveryMethodStepContainer
│   ├── PaymentDetailsStepContainer
│   └── ReviewStepContainer
│       └── ReviewCompleteStep
│           ├── ReviewStepHeader
│           ├── TransferSummaryCard
│           ├── SecurityNotice
│           └── PaymentSection
│               ├── PaymentSectionHeader
│               ├── PaymentSectionContent
│               │   ├── PaymentMethodSelector
│               │   └── FallbackPaymentForm
│               └── PaymentSectionContainer
├── StepVisibilityManager (controls step visibility)
└── FormErrorDisplay (centralized error display)
```

## 🔧 Backend Architecture

### Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Validation**: Zod schemas
- **Security**: Helmet, Rate limiting, CORS
- **Logging**: Custom audit logging
- **Error Handling**: Centralized error handling

### Service Layer Architecture

```
┌─────────────────────────────────────────┐
│              Routes Layer               │
│  ┌─────────────────────────────────────┐ │
│  │  transfers | countries | exchange  │ │
│  └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│             Service Layer               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Transfer  │ │Currency  │ │Delivery  │ │
│  │Service   │ │Service   │ │Service   │ │
│  └──────────┘ └──────────┘ └──────────┘ │
├─────────────────────────────────────────┤
│              Data Layer                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Countries │ │Currencies│ │Transfers │ │
│  │   Data   │ │   Data   │ │   Data   │ │
│  └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────┘
```

## 🔄 Data Flow

### Transfer Creation Flow

```
1. User Input (Frontend)
   ↓
2. Step-by-Step Form Validation (FormStep Components)
   ↓
3. StepVisibilityManager Controls Step Progression
   ↓
4. Fee Calculation (Service Layer)
   ↓
5. Exchange Rate Conversion (Service Layer)
   ↓
6. Transfer ID Generation (Service Layer)
   ↓
7. Data Persistence (Data Layer)
   ↓
8. Response (API → Frontend)
```

### New API Service Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  UI Component   │    │  Main ApiService│    │ Specialized     │
│                 │◄──►│                 │◄──►│ Services        │
│  Form Actions   │    │ Delegates calls │    │ BaseApi         │
│  Display Data   │    │ to specialized  │    │ DataApi         │
│                 │    │ services        │    │ TransactionApi  │
│                 │    │                 │    │ UserMgmtApi     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Security Architecture

### Frontend Security

- **Input Validation**: Client-side validation with Zod schemas
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based requests
- **Secure Storage**: Encrypted local storage for sensitive data

### Backend Security

- **Rate Limiting**: Request throttling per IP/user
- **Input Validation**: Server-side validation for all endpoints
- **CORS Configuration**: Controlled cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **Audit Logging**: Comprehensive request/response logging

## 📦 Key Design Patterns

### 1. Service Layer Pattern

Services are now organized into specialized layers:

```typescript
// Main API Service delegates to specialized services
export class ApiService {
  static async createTransfer(transferData: TransferFormData) {
    return BaseApiService.createTransfer(transferData)
  }
  
  static async getCurrencies() {
    return DataApiService.getCurrencies()
  }
}

// Specialized services handle specific domains
export class DataApiService {
  static async getCurrencies() {
    return CurrencyApiService.getCurrencies()
  }
  
  static async getCountries() {
    return CountryApiService.getCountries()
  }
}
```

### 2. Component Composition Pattern

Form components are now highly composable:

```typescript
export function FormStep({ stepNumber, title, description, children }) {
  return (
    <StepContainer>
      <StepIndicator stepNumber={stepNumber} title={title} description={description} />
      {children}
    </StepContainer>
  )
}
```

### 3. Hook Pattern (Frontend)

Custom hooks encapsulate stateful logic:

```typescript
export function useStepVisibility({ formData }) {
  const hasBasicInfo = !!(formData.amount && formData.recipientName && formData.recipientCountry)
  const showPaymentDetails = hasBasicInfo && !!formData.deliveryMethod
  
  return { hasBasicInfo, showPaymentDetails }
}
```

### 4. Manager Pattern

Managers handle complex component interactions:

```typescript
export function usePaymentMethodManager() {
  const [savedCards, setSavedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  // Business logic...
  return { savedCards, selectedCard, /* methods */ }
}
```

## 🔄 API Design

### RESTful Endpoints

```
GET    /api/currencies           # Get all currencies
GET    /api/countries            # Get all countries
POST   /api/transfers            # Create transfer
GET    /api/transfers/:id        # Get transfer details
POST   /api/transfers/preview    # Calculate transfer preview
GET    /api/exchange/rates       # Get exchange rates
POST   /api/exchange/convert     # Convert currency
```

### Request/Response Format

```typescript
// Request
interface TransferRequest {
  amount: string
  recipientName: string
  recipientCountry: string
  deliveryMethod: string
  fromCurrency: string
  toCurrency: string
}

// Response
interface TransferResponse {
  id: string
  status: string
  convertedAmount: string
  fee: number
  totalAmount: string
  estimatedDelivery: string
}
```

## 📊 Performance Considerations

### Frontend Optimizations

- **Code Splitting**: Route-based lazy loading
- **Component Memoization**: React.memo for expensive components
- **Query Optimization**: TanStack Query caching and deduplication
- **Bundle Analysis**: Vite bundle analyzer integration
- **Modular Components**: Small, focused components for better tree-shaking

### Backend Optimizations

- **Response Caching**: Cache control headers for static data
- **Request Validation**: Early validation to prevent processing
- **Error Handling**: Efficient error responses
- **Monitoring**: Response time and error rate tracking

## 🔧 Development Workflow

### Build Process

```
1. TypeScript Compilation
   ↓
2. Vite Bundling
   ↓
3. Tailwind CSS Processing
   ↓
4. Asset Optimization
   ↓
5. Output Generation
```

### Testing Strategy

- **Unit Tests**: Component and service testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Type Checking**: TypeScript compilation

## 🚀 Deployment Architecture

### Production Environment

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Edge      │    │   Load Balancer │    │   App Servers   │
│   (Static)      │    │                 │    │   (Multiple)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │    Database     │
                       │   (Primary +    │
                       │    Replicas)    │
                       └─────────────────┘
```

## 📈 Scalability Considerations

### Horizontal Scaling

- **Stateless Services**: No server-side session storage
- **Load Balancing**: Multiple application instances
- **Database Scaling**: Read replicas and sharding
- **Caching**: Redis for session and data caching

### Performance Monitoring

- **Application Metrics**: Response times, error rates
- **Infrastructure Metrics**: CPU, memory, network usage
- **User Experience**: Core Web Vitals tracking
- **Error Tracking**: Centralized error logging and alerting

## 🔗 External Integrations

### Third-Party Services

- **Exchange Rate APIs**: Real-time currency conversion
- **Payment Gateways**: Secure payment processing
- **Notification Services**: SMS and email delivery
- **Compliance APIs**: KYC/AML verification

### Integration Patterns

- **Circuit Breaker**: Fault tolerance for external calls
- **Retry Logic**: Exponential backoff for failed requests
- **Fallback Data**: Graceful degradation when services are unavailable
- **Webhook Handling**: Asynchronous event processing

## 🆕 Recent Architecture Updates

### Component Refactoring (2024)

1. **Form Components**: Split large form components into smaller, focused components
2. **Payment Section**: Extracted payment logic into specialized components
3. **API Services**: Reorganized API services into domain-specific modules
4. **Step Management**: Implemented step visibility management for better UX

### Benefits of Recent Changes

- **Better Maintainability**: Smaller, focused components are easier to maintain
- **Improved Reusability**: Components can be reused across different contexts
- **Enhanced Testability**: Isolated components are easier to test
- **Better Performance**: Smaller components enable better tree-shaking and lazy loading

This architecture provides a solid foundation for a scalable, secure, and maintainable international money transfer platform with modern component composition and service organization patterns.
