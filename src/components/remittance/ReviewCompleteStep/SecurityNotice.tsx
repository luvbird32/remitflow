
import { Shield } from "lucide-react"

/**
 * Security notice component that displays trust indicators and security
 * information to users during the payment process.
 * 
 * This component helps build user confidence by highlighting the security
 * measures in place to protect their transfer.
 * 
 * @returns JSX element with security information and trust indicators
 */
export function SecurityNotice() {
  return (
    <div className="modern-card p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 animate-scale-in" style={{animationDelay: '0.1s'}}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">Secure Transaction</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your transfer is protected by bank-level encryption and real-time fraud monitoring. 
            We guarantee secure delivery of your funds.
          </p>
        </div>
      </div>
    </div>
  )
}
