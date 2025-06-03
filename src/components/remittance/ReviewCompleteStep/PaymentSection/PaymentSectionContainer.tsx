
import { ReactNode } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

interface PaymentSectionContainerProps {
  children: ReactNode
}

export function PaymentSectionContainer({ children }: PaymentSectionContainerProps) {
  return (
    <Card className="modern-card overflow-hidden">
      <CardContent className="p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-500 rounded-xl flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          <h4 className="text-xl font-bold text-slate-800">Payment Method</h4>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
