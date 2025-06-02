
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
    <div>
      <label htmlFor="recipientName" className="block text-sm font-medium mb-2">
        <User className="h-4 w-4 inline mr-1" />
        Recipient Name
      </label>
      <Input
        id="recipientName"
        type="text"
        placeholder="Enter recipient's full name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
