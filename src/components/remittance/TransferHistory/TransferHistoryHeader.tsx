
import { Button } from "@/components/ui/button"
import { History, RefreshCw } from "lucide-react"

interface TransferHistoryHeaderProps {
  onRefresh: () => void
}

export function TransferHistoryHeader({ onRefresh }: TransferHistoryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-500/25">
          <History className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            Transfer History
          </h3>
          <p className="text-slate-600 font-medium">
            Track and review your recent money transfers
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onRefresh}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
    </div>
  )
}
