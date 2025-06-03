// Placeholder for API utilities - can be expanded based on needs
export const loadCurrenciesAndCountries = async () => {
  // This function is referenced in useTransferForm but not actually needed
  // since we have static data. Adding as placeholder for future API integration.
  return Promise.resolve()
}

export const apiConfig = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000
}
