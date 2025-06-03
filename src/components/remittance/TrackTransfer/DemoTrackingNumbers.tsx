
import { Button } from "@/components/ui/button"

interface DemoTrackingNumbersProps {
  onSelectDemo: (trackingNumber: string) => void
}

export function DemoTrackingNumbers({ onSelectDemo }: DemoTrackingNumbersProps) {
  return (
    <div className="modern-card p-4 border-l-4 border-blue-500">
      <p className="text-sm font-medium text-blue-800 mb-3">Try these demo tracking numbers:</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectDemo("TRF001234")}
          className="text-xs"
        >
          TRF001234 (Delivered)
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectDemo("TRF005678")}
          className="text-xs"
        >
          TRF005678 (Processing)
        </Button>
      </div>
    </div>
  )
}
