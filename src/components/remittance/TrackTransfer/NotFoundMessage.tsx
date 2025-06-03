
import { XCircle } from "lucide-react"

export function NotFoundMessage() {
  return (
    <div className="modern-card p-6 text-center border-l-4 border-red-500">
      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-red-800 mb-2">Transfer not found</h4>
      <p className="text-red-600">Please check your tracking number and try again</p>
    </div>
  )
}
