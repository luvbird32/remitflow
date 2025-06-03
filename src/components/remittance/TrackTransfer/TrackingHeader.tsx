
import { Search } from "lucide-react"

export function TrackingHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
        <Search className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          Track Your Transfer
        </h3>
        <p className="text-slate-600 font-medium">
          Enter your tracking number to see the status of your money transfer
        </p>
      </div>
    </div>
  )
}
