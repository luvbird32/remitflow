
import { RefreshCw, History } from "lucide-react"

export function LoadingState() {
  return (
    <div className="modern-card p-6 sm:p-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
          <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-spin" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            Loading Transfer History
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Fetching your recent transactions...
          </p>
        </div>
      </div>
    </div>
  )
}
