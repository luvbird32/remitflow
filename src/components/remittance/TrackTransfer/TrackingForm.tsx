
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TrackingFormProps {
  trackingNumber: string
  setTrackingNumber: (value: string) => void
  onTrack: () => void
  isSearching: boolean
}

export function TrackingForm({ trackingNumber, setTrackingNumber, onTrack, isSearching }: TrackingFormProps) {
  return (
    <div className="flex gap-3">
      <Input
        placeholder="Enter reference number (e.g., TXN12345678)"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="flex-1 h-12"
      />
      <Button 
        onClick={onTrack} 
        disabled={!trackingNumber || isSearching}
        className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        {isSearching ? "Looking..." : "Check Status"}
      </Button>
    </div>
  )
}
