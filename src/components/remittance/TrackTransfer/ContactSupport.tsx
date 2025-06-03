
import { Button } from "@/components/ui/button"

export function ContactSupport() {
  return (
    <div className="modern-card p-6 bg-gradient-to-r from-slate-50 to-gray-50">
      <h4 className="font-semibold mb-3 text-slate-800">Need Help?</h4>
      <p className="text-slate-600 mb-4">
        If you have questions about your transfer, our support team is here to help.
      </p>
      <Button variant="outline" className="hover:bg-white">
        Contact Support
      </Button>
    </div>
  )
}
