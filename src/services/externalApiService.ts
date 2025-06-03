
import { httpClient } from './httpClient'

/**
 * External API Service
 * 
 * Handles all external service integrations including
 * external rates, notifications, and webhook calls.
 */
export class ExternalApiService {
  /**
   * Fetches exchange rates from external rate providers
   * @returns Promise resolving to external rate data
   */
  static async getExternalRates() {
    return httpClient.get('/external/rates')
  }

  /**
   * Sends notifications to external services
   * @param data - Notification data including service and payload
   * @returns Promise resolving to notification response
   */
  static async notifyExternalService(data: any) {
    return httpClient.post('/external/notify', data)
  }

  /**
   * Proxies webhook calls to external services
   * @param url - Target webhook URL
   * @param data - Webhook payload data
   * @returns Promise resolving to webhook delivery response
   */
  static async webhookCall(url: string, data: any) {
    return httpClient.post('/external/webhook', { url, data })
  }
}
