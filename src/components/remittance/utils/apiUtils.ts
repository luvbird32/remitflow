
// API utilities for frontend to backend communication
export const loadCurrenciesAndCountries = async () => {
  // This function loads data from the backend services
  // All business logic is now handled by backend services:
  // - CurrencyService: handles currency operations
  // - CountryService: handles country operations  
  // - DeliveryService: handles delivery method operations
  // - FeeService: handles fee calculations
  // - TransferService: orchestrates transfer operations
  return Promise.resolve()
}

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000
}
