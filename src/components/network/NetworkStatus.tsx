
import { useState } from 'react'
import { Wifi, WifiOff, Zap, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { httpClient } from '@/services/httpClient'

export function NetworkStatus() {
  const networkStatus = useNetworkStatus()
  const [circuitStats, setCircuitStats] = useState(httpClient.getCircuitBreakerStatus())

  const refreshStats = () => {
    setCircuitStats(httpClient.getCircuitBreakerStatus())
  }

  const getStatusColor = () => {
    if (!networkStatus.isOnline) return 'destructive'
    if (networkStatus.isSlowConnection) return 'secondary'
    return 'default'
  }

  const getStatusIcon = () => {
    if (!networkStatus.isOnline) return <WifiOff className="w-4 h-4" />
    if (networkStatus.isSlowConnection) return <Clock className="w-4 h-4" />
    return <Wifi className="w-4 h-4" />
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Network Status</span>
            <Badge variant={getStatusColor()} className="flex items-center gap-1">
              {getStatusIcon()}
              {networkStatus.isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>

          {networkStatus.isSlowConnection && (
            <div className="text-xs text-amber-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Slow connection detected ({networkStatus.connectionType})
            </div>
          )}

          {networkStatus.wasOffline && networkStatus.isOnline && (
            <div className="text-xs text-green-600">
              Connection restored - you're back online!
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">API Circuit Breaker</span>
              <Badge 
                variant={circuitStats.state === 'closed' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {circuitStats.state.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Failures: {circuitStats.failureCount}</div>
              <div>Successes: {circuitStats.successCount}</div>
            </div>

            <button 
              onClick={refreshStats}
              className="text-xs text-blue-600 hover:underline"
            >
              Refresh Stats
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
