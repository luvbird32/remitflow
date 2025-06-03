
import { Shield, Lock, Eye } from "lucide-react"

/**
 * Security notice component that displays important security information
 * to users during the review step of the transfer process.
 * 
 * This component provides reassurance about:
 * - Data encryption and security measures
 * - Regulatory compliance
 * - Privacy protection
 * 
 * @returns JSX element with security information
 */
export function SecurityNotice() {
  return (
    <div className="modern-card p-6 bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <h4 className="text-lg font-bold text-slate-800">Security & Privacy</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lock className="h-3 w-3 text-emerald-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-1">Bank-Level Encryption</div>
            <div className="text-slate-500">Your data is protected with 256-bit SSL encryption</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="h-3 w-3 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-1">Regulated Service</div>
            <div className="text-slate-500">Licensed and monitored by financial authorities</div>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Eye className="h-3 w-3 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-1">Privacy Protected</div>
            <div className="text-slate-500">We never share your personal information</div>
          </div>
        </div>
      </div>
    </div>
  )
}
