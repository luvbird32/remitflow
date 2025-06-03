
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ApiService } from '@/services/apiService'
import { httpClient } from '@/services/httpClient'
import { useToast } from '@/hooks/use-toast'

export function HttpTestComponent() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [customUrl, setCustomUrl] = useState('')
  const { toast } = useToast()

  const testApiCall = async (type: string) => {
    setLoading(true)
    try {
      let response
      
      switch (type) {
        case 'currencies':
          response = await ApiService.getCurrencies()
          break
        case 'countries':
          response = await ApiService.getCountries()
          break
        case 'external-rates':
          response = await ApiService.getExternalRates()
          break
        case 'health':
          response = await httpClient.get('/external/health')
          break
        case 'custom':
          if (customUrl) {
            response = await httpClient.get(customUrl)
          } else {
            throw new Error('Please enter a custom URL')
          }
          break
        default:
          throw new Error('Unknown test type')
      }
      
      setResult(response)
      toast({
        title: "Success",
        description: `${type} API call completed successfully`,
      })
    } catch (error: any) {
      console.error('HTTP test error:', error)
      setResult({ error: error.message })
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const clearCache = () => {
    httpClient.clearCache()
    toast({
      title: "Cache Cleared",
      description: "HTTP cache has been cleared",
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>HTTP Client Test Interface</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => testApiCall('currencies')} 
            disabled={loading}
            variant="outline"
          >
            Test Currencies API
          </Button>
          <Button 
            onClick={() => testApiCall('countries')} 
            disabled={loading}
            variant="outline"
          >
            Test Countries API
          </Button>
          <Button 
            onClick={() => testApiCall('external-rates')} 
            disabled={loading}
            variant="outline"
          >
            Test External Rates
          </Button>
          <Button 
            onClick={() => testApiCall('health')} 
            disabled={loading}
            variant="outline"
          >
            Test Health Check
          </Button>
          <Button 
            onClick={clearCache} 
            variant="outline"
          >
            Clear Cache
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Endpoint Test:</label>
          <div className="flex gap-2">
            <Input
              placeholder="/api/custom-endpoint"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <Button 
              onClick={() => testApiCall('custom')} 
              disabled={loading || !customUrl}
            >
              Test Custom
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="ml-2">Making HTTP request...</span>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Response:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
