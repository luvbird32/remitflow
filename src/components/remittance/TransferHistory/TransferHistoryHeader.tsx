
import { Button } from "@/components/ui/button"
import { History, RefreshCw } from "lucide-react"

interface TransferHistoryHeaderProps {
  onRefresh: () => void
}

export function TransferHistoryHeader({ onRefresh }: TransferHistoryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-500/25">
          <History className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Transfer History
          </h3>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Track and review your transfers
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onRefresh}
        variant="outline"
        className="flex items-center gap-2 h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
      >
        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Refresh</span>
      </Button>
    </div>
  )
}
