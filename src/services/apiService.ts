
const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  static async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }

  static async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return response.json();
  }

  // Transfer methods
  static createTransfer(transferData: any) {
    return this.post('/transfers', transferData);
  }

  static getTransfer(id: string) {
    return this.get(`/transfers/${id}`);
  }

  static getTransferPreview(data: any) {
    return this.post('/transfers/preview', data);
  }

  static getAllTransfers() {
    return this.get('/transfers');
  }

  // Exchange methods
  static getCurrencies() {
    return this.get('/exchange/currencies');
  }

  static getCountries() {
    return this.get('/exchange/countries');
  }

  static getExchangeRate(from: string, to: string) {
    return this.get(`/exchange/rate/${from}/${to}`);
  }

  static convertCurrency(data: any) {
    return this.post('/exchange/convert', data);
  }
}
