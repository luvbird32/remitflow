
import { Card, CardContent } from "@/components/ui/card"

export function LoadingState() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading transfer form...</span>
        </div>
      </CardContent>
    </Card>
  )
}
