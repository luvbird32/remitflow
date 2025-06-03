
import { httpClient } from './httpClient'
import { ConversionResult } from '@/components/remittance/types'

/**
 * Enhanced API Service using the HTTP client with interceptors and error handling
 */
export class EnhancedApiService {
  // Currency endpoints
  static async getCurrencies() {
    return httpClient.get('/currencies')
  }

  static async getCurrency(code: string) {
    return httpClient.get(`/currencies/${code}`)
  }

  static async getExchangeRate(from: string, to: string) {
    return httpClient.get(`/currencies/rate/${from}/${to}`)
  }

  // Country endpoints
  static async getCountries() {
    return httpClient.get('/countries')
  }

  static async getCountry(code: string) {
    return httpClient.get(`/countries/${code}`)
  }

  static async getDeliveryMethods(countryCode: string) {
    return httpClient.get(`/countries/${countryCode}/delivery-methods`)
  }

  // Exchange endpoints
  static async convertCurrency(data: { amount: string; from: string; to: string }): Promise<ConversionResult> {
    return httpClient.post<ConversionResult>('/exchange/convert', data)
  }

  // Transfer endpoints
  static async createTransfer(transferData: any) {
    return httpClient.post('/transfers', transferData)
  }

  static async validateTransfer(transferData: any) {
    return httpClient.post('/transfers/validate', transferData)
  }

  static async getTransferPreview(data: { amount: string; fromCurrency: string; toCurrency: string; deliveryMethod: string }) {
    return httpClient.post('/transfers/preview', data)
  }

  static async trackTransfer(transferId: string) {
    return httpClient.get(`/transfers/${transferId}`)
  }

  static async getTransferHistory() {
    return httpClient.get('/transfers')
  }

  // External service endpoints
  static async getExternalRates() {
    return httpClient.get('/external/rates')
  }

  static async notifyExternalService(data: any) {
    return httpClient.post('/external/notify', data)
  }

  static async webhookCall(url: string, data: any) {
    return httpClient.post('/external/webhook', { url, data })
  }
}
