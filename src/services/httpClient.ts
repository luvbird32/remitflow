
interface HttpClientConfig {
  baseURL: string
  timeout: number
  retries: number
  cache?: boolean
}

interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit | Promise<RequestInit>
  onRequestError?: (error: Error) => Promise<Error>
}

interface ResponseInterceptor {
  onResponse?: (response: Response) => Response | Promise<Response>
  onResponseError?: (error: Error) => Promise<Error>
}

class HttpClient {
  private config: HttpClientConfig
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  constructor(config: HttpClientConfig) {
    this.config = config
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  private async applyRequestInterceptors(config: RequestInit): Promise<RequestInit> {
    let modifiedConfig = config
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        modifiedConfig = await interceptor.onRequest(modifiedConfig)
      }
    }
    return modifiedConfig
  }

  private async applyResponseInterceptors(response: Response): Promise<Response> {
    let modifiedResponse = response
    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponse) {
        modifiedResponse = await interceptor.onResponse(modifiedResponse)
      }
    }
    return modifiedResponse
  }

  private getCacheKey(url: string, options: RequestInit): string {
    return `${url}_${JSON.stringify(options)}`
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }
    this.cache.delete(key)
    return null
  }

  private setCache(key: string, data: any, ttl: number = 300000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`
    const cacheKey = this.getCacheKey(url, options)

    // Check cache for GET requests
    if (this.config.cache && (!options.method || options.method === 'GET')) {
      const cached = this.getFromCache(cacheKey)
      if (cached) {
        console.log('Returning cached response for:', url)
        return cached
      }
    }

    let config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    config = await this.applyRequestInterceptors(config)

    let retries = this.config.retries
    while (retries >= 0) {
      try {
        console.log(`HTTP ${config.method || 'GET'} request to:`, url)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        const processedResponse = await this.applyResponseInterceptors(response)

        if (!processedResponse.ok) {
          throw new Error(`HTTP ${processedResponse.status}: ${processedResponse.statusText}`)
        }

        const data = await processedResponse.json()

        // Cache successful GET requests
        if (this.config.cache && (!config.method || config.method === 'GET')) {
          this.setCache(cacheKey, data)
        }

        return data
      } catch (error: any) {
        console.error(`HTTP request failed (${this.config.retries - retries + 1}/${this.config.retries + 1}):`, error)
        
        if (retries === 0 || error.name === 'AbortError') {
          // Apply error interceptors
          for (const interceptor of this.responseInterceptors) {
            if (interceptor.onResponseError) {
              await interceptor.onResponseError(error)
            }
          }
          throw error
        }
        retries--
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    throw new Error('Max retries exceeded')
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  clearCache(): void {
    this.cache.clear()
  }
}

// Create default HTTP client instance
export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retries: 2,
  cache: true
})

// Add default interceptors
httpClient.addRequestInterceptor({
  onRequest: (config) => {
    console.log('Request interceptor - adding timestamp:', new Date().toISOString())
    return {
      ...config,
      headers: {
        ...config.headers,
        'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        'X-Timestamp': new Date().toISOString(),
      },
    }
  },
  onRequestError: async (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
})

httpClient.addResponseInterceptor({
  onResponse: (response) => {
    console.log('Response interceptor - status:', response.status)
    return response
  },
  onResponseError: async (error) => {
    console.error('Response interceptor error:', error)
    return Promise.reject(error)
  }
})

export { HttpClient }
export type { HttpClientConfig, RequestInterceptor, ResponseInterceptor }
