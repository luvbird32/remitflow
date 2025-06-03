
import { MapPin } from "lucide-react"

interface TrackingStep {
  status: string
  timestamp: string
  location: string
  description: string
}

interface TrackingTimelineProps {
  trackingSteps: TrackingStep[]
  getStatusIcon: (status: string) => React.ReactNode
}

export function TrackingTimeline({ trackingSteps, getStatusIcon }: TrackingTimelineProps) {
  return (
    <div className="modern-card p-6">
      <h4 className="text-lg font-semibold mb-6 text-slate-800">Tracking Timeline</h4>
      <div className="space-y-4">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-slate-800">{step.status}</p>
                <p className="text-sm text-slate-500">
                  {new Date(step.timestamp).toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-slate-600 mb-1">{step.description}</p>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                <p className="text-xs text-slate-500">{step.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
