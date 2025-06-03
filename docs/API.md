
# API Documentation

This document provides comprehensive documentation for the RemitFlow API endpoints, including request/response formats, authentication, and usage examples.

## 📚 Table of Contents

- [Base URL & Authentication](#base-url--authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Transfers](#transfers)
  - [Currencies](#currencies)
  - [Countries](#countries)
  - [Exchange Rates](#exchange-rates)
  - [Tracking](#tracking)
  - [External Services](#external-services)
- [API Service Architecture](#api-service-architecture)

## 🔗 Base URL & Authentication

### Base URL
```
Production: https://api.remitflow.com/api
Development: http://localhost:3001/api
```

### Authentication
Currently, the API operates without authentication for demo purposes. In production, implement:

```http
Authorization: Bearer <your-jwt-token>
X-API-Key: <your-api-key>
```

## 📋 Response Format

### Success Response
```json
{
  "data": { /* response data */ },
  "status": "success",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": { /* additional error context */ }
  },
  "status": "error",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

### Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `TRANSFER_NOT_FOUND` | Transfer ID not found |
| `CURRENCY_NOT_SUPPORTED` | Currency not supported |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INTERNAL_ERROR` | Server error |

## 🚦 Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## 🔄 Endpoints

## Transfers

### Create Transfer

Create a new money transfer.

```http
POST /transfers
```

**Request Body:**
```json
{
  "amount": "100.00",
  "recipientName": "John Doe",
  "recipientEmail": "john@example.com",
  "recipientCountry": "NG",
  "deliveryMethod": "bank",
  "fromCurrency": "USD",
  "toCurrency": "NGN",
  "accountNumber": "1234567890",
  "bankName": "First Bank",
  "senderName": "Jane Smith",
  "senderEmail": "jane@example.com"
}
```

**Response:**
```json
{
  "id": "TXN1734123456789abc123def",
  "status": "pending",
  "convertedAmount": "46150.00",
  "fee": 4.99,
  "totalAmount": "104.99",
  "estimatedDelivery": "2024-01-17T10:30:00.000Z"
}
```

### Get Transfer

Retrieve transfer details by ID.

```http
GET /transfers/{transferId}
```

**Response:**
```json
{
  "id": "TXN1734123456789abc123def",
  "amount": "100.00",
  "recipientName": "John Doe",
  "recipientCountry": "NG",
  "deliveryMethod": "bank",
  "fromCurrency": "USD",
  "toCurrency": "NGN",
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:30:00.000Z"
}
```

### Transfer Preview

Calculate transfer preview without creating transfer.

```http
POST /transfers/preview
```

**Request Body:**
```json
{
  "amount": "100.00",
  "fromCurrency": "USD",
  "toCurrency": "NGN",
  "deliveryMethod": "bank"
}
```

**Response:**
```json
{
  "convertedAmount": "46150.00",
  "fee": 4.99,
  "totalAmount": "104.99",
  "estimatedDelivery": "1-3 business days"
}
```

### Validate Transfer

Validate transfer data before submission.

```http
POST /transfers/validate
```

**Request Body:**
```json
{
  "amount": "100.00",
  "recipientName": "John Doe",
  "recipientCountry": "NG",
  "deliveryMethod": "bank"
}
```

**Response:**
```json
{
  "valid": true
}
```

**Error Response:**
```json
{
  "errors": [
    {
      "field": "amount",
      "message": "Minimum transfer amount is $1"
    }
  ]
}
```

## Currencies

### Get All Currencies

Retrieve all supported currencies.

```http
GET /currencies
```

**Response:**
```json
[
  {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "rate": 1
  },
  {
    "code": "NGN",
    "name": "Nigerian Naira",
    "symbol": "₦",
    "rate": 461.50
  }
]
```

### Get Currency by Code

Retrieve specific currency information.

```http
GET /currencies/{code}
```

**Response:**
```json
{
  "code": "USD",
  "name": "US Dollar",
  "symbol": "$",
  "rate": 1
}
```

## Countries

### Get All Countries

Retrieve all supported countries.

```http
GET /countries
```

**Response:**
```json
[
  {
    "code": "NG",
    "name": "Nigeria",
    "currency": "NGN",
    "flag": "🇳🇬",
    "deliveryMethods": ["bank", "card", "wallet"]
  }
]
```

### Get Country by Code

Retrieve specific country information.

```http
GET /countries/{code}
```

**Response:**
```json
{
  "code": "NG",
  "name": "Nigeria",
  "currency": "NGN",
  "flag": "🇳🇬",
  "deliveryMethods": ["bank", "card", "wallet"]
}
```

### Get Delivery Methods

Retrieve available delivery methods for a country.

```http
GET /countries/{code}/delivery-methods
```

**Response:**
```json
[
  {
    "id": "bank",
    "name": "Bank Transfer",
    "description": "Direct transfer to bank account",
    "estimatedTime": "1-3 business days",
    "fee": 0,
    "available": true
  },
  {
    "id": "card",
    "name": "Debit Card",
    "description": "Transfer to recipient's debit card",
    "estimatedTime": "1-2 hours",
    "fee": 1.99,
    "available": true
  }
]
```

## Exchange Rates

### Convert Currency

Convert amount between currencies.

```http
POST /exchange/convert
```

**Request Body:**
```json
{
  "amount": "100.00",
  "from": "USD",
  "to": "NGN"
}
```

**Response:**
```json
{
  "convertedAmount": "46150.00",
  "rate": 461.50,
  "fromCurrency": "USD",
  "toCurrency": "NGN"
}
```

### Get Exchange Rates

Retrieve all exchange rates.

```http
GET /exchange/rates
```

**Response:**
```json
[
  {
    "from": "USD",
    "to": "NGN",
    "rate": 461.50
  },
  {
    "from": "USD",
    "to": "EUR",
    "rate": 0.85
  }
]
```

### Get Specific Rate

Get exchange rate between two currencies.

```http
GET /exchange/rate/{from}/{to}
```

**Response:**
```json
{
  "from": "USD",
  "to": "NGN",
  "rate": 461.50
}
```

## Tracking

### Get Transfer Tracking

Track transfer status and progress.

```http
GET /tracking/{transferId}
```

**Response:**
```json
{
  "id": "TXN1734123456789abc123def",
  "status": "in_transit",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z",
  "estimatedDelivery": "2024-01-17T10:30:00.000Z",
  "statusHistory": [
    {
      "status": "pending",
      "timestamp": "2024-01-15T10:30:00.000Z",
      "description": "Transfer initiated and awaiting processing"
    },
    {
      "status": "processing",
      "timestamp": "2024-01-15T10:45:00.000Z",
      "description": "Transfer is being processed"
    }
  ]
}
```

### Update Transfer Status

Update the status of a transfer (for demo purposes).

```http
PUT /tracking/{transferId}/status
```

**Request Body:**
```json
{
  "status": "delivered"
}
```

**Response:**
```json
{
  "id": "TXN1734123456789abc123def",
  "status": "delivered",
  "updatedAt": "2024-01-15T12:30:00.000Z",
  "statusHistory": [
    {
      "status": "delivered",
      "timestamp": "2024-01-15T12:30:00.000Z",
      "description": "Transfer has been delivered successfully"
    }
  ]
}
```

## External Services

### Get External Rates

Fetch exchange rates from external providers.

```http
GET /external/rates
```

**Response:**
```json
{
  "provider": "External Exchange API",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "rates": {
    "USD-EUR": 0.85,
    "USD-GBP": 0.73,
    "USD-JPY": 110.25
  },
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

### Send External Notification

Send notifications to external services.

```http
POST /external/notify
```

**Request Body:**
```json
{
  "service": "sms",
  "data": {
    "recipient": "+1234567890",
    "message": "Your transfer has been completed"
  }
}
```

**Response:**
```json
{
  "id": "notif_1734123456789",
  "service": "sms",
  "status": "sent",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "response": "External service notified successfully"
}
```

### Health Check

Check the health of external service dependencies.

```http
GET /external/health
```

**Response:**
```json
{
  "status": "ok",
  "services": [
    {
      "name": "Exchange Rate API",
      "status": "healthy",
      "responseTime": "150ms"
    },
    {
      "name": "Payment Gateway",
      "status": "healthy",
      "responseTime": "230ms"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🏗️ API Service Architecture

### Frontend API Service Organization

The frontend uses a layered API service architecture:

```typescript
// Main API Service - Entry point for all API calls
class ApiService {
  // Delegates to specialized services
  static async createTransfer(data) {
    return BaseApiService.createTransfer(data)
  }
  
  static async getCurrencies() {
    return DataApiService.getCurrencies()
  }
}

// Specialized Services
class BaseApiService {
  // Core transfer operations
  static async createTransfer(data) { /* ... */ }
  static async validateTransfer(data) { /* ... */ }
}

class DataApiService {
  // Data operations (currencies, countries)
  static async getCurrencies() {
    return CurrencyApiService.getCurrencies()
  }
  
  static async getCountries() {
    return CountryApiService.getCountries()
  }
}

class TransactionApiService {
  // Transaction operations (exchanges, previews)
  static async convertCurrency(data) { /* ... */ }
  static async getTransferPreview(data) { /* ... */ }
}

class UserManagementService {
  // User and external service operations
  static async getUserProfile(userId) { /* ... */ }
  static async getExternalRates() { /* ... */ }
}
```

### Service Delegation Pattern

```
ApiService (Main Entry Point)
├── BaseApiService (Core Operations)
├── DataApiService (Data Operations)
│   ├── CurrencyApiService
│   └── CountryApiService
├── TransactionApiService (Transaction Operations)
│   ├── ExchangeApiService
│   └── TransferApiService
└── UserManagementService (User & External Operations)
```

## 📝 Usage Examples

### JavaScript/TypeScript

```typescript
import { ApiService } from '@/services/apiService'

// Create a transfer
const createTransfer = async (transferData: TransferRequest) => {
  try {
    const result = await ApiService.createTransfer(transferData)
    return result
  } catch (error) {
    console.error('Transfer creation failed:', error)
    throw error
  }
}

// Get exchange rate
const getExchangeRate = async (from: string, to: string) => {
  const rate = await ApiService.getExchangeRate(from, to)
  return rate
}

// Get currencies using the specialized service
const currencies = await ApiService.getCurrencies()

// Track transfer
const tracking = await ApiService.trackTransfer(transferId)
```

### React Hook Usage

```typescript
import { useQuery } from '@tanstack/react-query'
import { ApiService } from '@/services/apiService'

// Using TanStack Query with the API service
const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: ApiService.getCurrencies,
  })
}

const useTransferPreview = (previewData) => {
  return useQuery({
    queryKey: ['transfer-preview', previewData],
    queryFn: () => ApiService.getTransferPreview(previewData),
    enabled: !!previewData.amount,
  })
}
```

### cURL Examples

```bash
# Create transfer
curl -X POST http://localhost:3001/api/transfers \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "100.00",
    "recipientName": "John Doe",
    "recipientCountry": "NG",
    "deliveryMethod": "bank",
    "fromCurrency": "USD",
    "toCurrency": "NGN"
  }'

# Get currencies
curl http://localhost:3001/api/currencies

# Track transfer
curl http://localhost:3001/api/tracking/TXN1734123456789abc123def
```

## 🔍 Testing

### API Service Testing

```typescript
import { ApiService } from '@/services/apiService'

describe('ApiService', () => {
  test('creates transfer successfully', async () => {
    const transferData = {
      amount: '100.00',
      recipientName: 'John Doe',
      recipientCountry: 'NG',
      deliveryMethod: 'bank',
      fromCurrency: 'USD',
      toCurrency: 'NGN'
    }
    
    const result = await ApiService.createTransfer(transferData)
    expect(result.id).toBeDefined()
    expect(result.status).toBe('pending')
  })
})
```

### Health Check

```bash
# Health check
curl http://localhost:3001/health

# Get all currencies
curl http://localhost:3001/api/currencies

# Convert currency
curl -X POST http://localhost:3001/api/exchange/convert \
  -H "Content-Type: application/json" \
  -d '{"amount": "100", "from": "USD", "to": "NGN"}'
```

## 🚀 Best Practices

### Error Handling

```typescript
// Proper error handling with the API service
try {
  const transfer = await ApiService.createTransfer(data)
  // Handle success
} catch (error) {
  if (error.response?.status === 422) {
    // Handle validation errors
  } else if (error.response?.status === 429) {
    // Handle rate limiting
  } else {
    // Handle general errors
  }
}
```

### Caching Strategy

```typescript
// Use TanStack Query for intelligent caching
const { data: currencies } = useQuery({
  queryKey: ['currencies'],
  queryFn: ApiService.getCurrencies,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
})
```

For more detailed testing examples, see the [Testing Guide](./TESTING.md).
