
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Send Money</CardTitle>
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
