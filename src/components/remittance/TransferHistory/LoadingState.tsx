
import { RefreshCw, History } from "lucide-react"

export function LoadingState() {
  return (
    <div className="modern-card p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
          <RefreshCw className="h-6 w-6 text-white animate-spin" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            Loading Transfer History
          </h3>
          <p className="text-slate-600">
            Fetching your recent transactions...
          </p>
        </div>
      </div>
    </div>
  )
}
