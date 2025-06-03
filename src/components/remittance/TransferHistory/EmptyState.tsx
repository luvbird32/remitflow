
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <History className="h-10 w-10 text-slate-400" />
      </div>
      <h4 className="text-xl font-semibold text-slate-700 mb-3">No transfers yet</h4>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">
        Your transfer history will appear here once you make your first transfer. Start sending money to friends and family around the world.
      </p>
      <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
        Send Your First Transfer
      </Button>
    </div>
  )
}
