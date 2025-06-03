
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FallbackUIProps {
  title?: string
  description?: string
  onRetry?: () => void
  showRetry?: boolean
}

export function FallbackUI({ 
  title = "Unable to load content",
  description = "Something went wrong while loading this section.",
  onRetry,
  showRetry = true
}: FallbackUIProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {showRetry && onRetry && (
        <CardContent className="text-center">
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
