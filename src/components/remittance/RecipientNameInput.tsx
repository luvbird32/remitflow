
import { Input } from "@/components/ui/input"
import { AlertCircle, User } from "lucide-react"

/**
 * Props for the RecipientNameInput component
 */
interface RecipientNameInputProps {
  recipientName: string
  setRecipientName: (name: string) => void
  error?: string
}

/**
 * Input component for recipient name with validation and error display
 * @param recipientName - Current recipient name value
 * @param setRecipientName - Function to update recipient name
 * @param error - Optional error message to display
 * @returns JSX element containing the recipient name input field
 */
export function RecipientNameInput({
  recipientName,
  setRecipientName,
  error
}: RecipientNameInputProps) {
  return (
    <div className="space-y-3">
      <label htmlFor="recipientName" className="form-label">
        <div className="w-5 h-5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <User className="h-3 w-3 text-white" />
        </div>
        Recipient Full Name
      </label>
      <Input
        id="recipientName"
        type="text"
        placeholder="Enter recipient's full name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className={`form-input h-14 text-lg ${error ? "border-red-500 focus:ring-red-100" : ""}`}
      />
      {error && (
        <div className="modern-card p-3 border-red-200 bg-red-50/80">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
