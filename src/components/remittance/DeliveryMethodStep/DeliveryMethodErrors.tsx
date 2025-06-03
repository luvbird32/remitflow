
import { AlertCircle } from "lucide-react"
import { FormErrors } from '../types'

interface DeliveryMethodErrorsProps {
  errors: FormErrors
}

export function DeliveryMethodErrors({ errors }: DeliveryMethodErrorsProps) {
  return (
    <>
      {errors.deliveryMethod && (
        <div className="modern-card p-4 border-red-200 bg-red-50/80">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Please choose how your recipient will get the money
          </p>
        </div>
      )}

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Something went wrong</p>
          <p className="text-sm">{errors.general}</p>
        </div>
      )}
    </>
  )
}
