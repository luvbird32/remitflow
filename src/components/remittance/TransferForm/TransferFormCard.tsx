
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { TransferFormSteps } from './TransferFormSteps'
import { TransferFormData, FormErrors } from '../types'

interface TransferFormCardProps {
  formData: TransferFormData
  setFormData: (data: TransferFormData) => void
  updateFormData: (updates: Partial<TransferFormData>) => void
  onCountryChange: (countryCode: string) => void
  errors: FormErrors
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function TransferFormCard({
  formData,
  setFormData,
  updateFormData,
  onCountryChange,
  errors,
  isSubmitting,
  onSubmit
}: TransferFormCardProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Send Money
        </CardTitle>
        <CardDescription>
          Send money quickly and securely to anyone, anywhere
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransferFormSteps
          formData={formData}
          setFormData={setFormData}
          updateFormData={updateFormData}
          onCountryChange={onCountryChange}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  )
}
