
import { FormErrors } from '../types'

interface FormErrorDisplayProps {
  errors: FormErrors
}

export function FormErrorDisplay({ errors }: FormErrorDisplayProps) {
  if (!errors.general) return null

  return (
    <div className="text-red-500 text-sm text-center">
      {errors.general}
    </div>
  )
}
