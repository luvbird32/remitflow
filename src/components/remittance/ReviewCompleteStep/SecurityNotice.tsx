
import { Shield, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SecurityNotice() {
  return (
    <Card className="modern-card border-green-200 bg-green-50/80">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-green-800">Secure Transfer</h4>
            <p className="text-green-700 text-sm">
              Your transfer is protected with bank-level security and encryption. 
              We never store your payment information.
            </p>
            <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
              <Lock className="h-3 w-3" />
              <span>256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
