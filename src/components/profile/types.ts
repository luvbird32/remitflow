
export interface UserInfo {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  nationality: string
}

export interface UserPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  currency: string
  language: string
}

export interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export interface UserProfileResponse {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  dateOfBirth?: string
  nationality?: string
  preferences?: UserPreferences
  paymentMethods?: SavedCard[]
}
