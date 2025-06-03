
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <History className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
      </div>
      <h4 className="text-lg sm:text-xl font-semibold text-slate-700 mb-3">No transfers yet</h4>
      <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
        Your transfer history will appear here once you make your first transfer. Start sending money to friends and family around the world.
      </p>
      <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 h-10 sm:h-11 px-6 sm:px-8 text-sm sm:text-base">
        Send Your First Transfer
      </Button>
    </div>
  )
}
