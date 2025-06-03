
// Re-export everything from the smaller utility modules
export * from './utils/currencyUtils'
export * from './utils/countryUtils' 
export * from './utils/deliveryUtils'
export * from './utils/apiUtils'
export * from './utils/stepValidation'

// For backwards compatibility, also export loadCurrenciesAndCountries directly
export const loadCurrenciesAndCountries = async () => {
  return Promise.resolve()
}
