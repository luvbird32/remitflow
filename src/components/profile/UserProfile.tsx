
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Shield, Bell, CreditCard, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ApiService } from "@/services/apiService"

interface UserInfo {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  nationality: string
}

interface UserPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  currency: string
  language: string
}

interface SavedCard {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-01-15",
    nationality: "United States"
  })

  const [preferences, setPreferences] = useState<UserPreferences>({
    emailNotifications: true,
    smsNotifications: false,
    currency: "USD",
    language: "English"
  })

  const [savedCards] = useState<SavedCard[]>([
    {
      id: "card_1",
      last4: "4567",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 25,
      isDefault: true
    },
    {
      id: "card_2",
      last4: "8901",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 26,
      isDefault: false
    }
  ])

  // Load user profile on component mount
  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      // In a real app, get user ID from auth context
      const userId = "1"
      const profile = await ApiService.request(`/users/profile/${userId}`, { method: 'GET' })
      
      if (profile) {
        setUserInfo({
          name: profile.name || userInfo.name,
          email: profile.email || userInfo.email,
          phone: profile.phone || userInfo.phone,
          address: profile.address || userInfo.address,
          dateOfBirth: profile.dateOfBirth || userInfo.dateOfBirth,
          nationality: profile.nationality || userInfo.nationality
        })
      }
    } catch (error) {
      console.log("Failed to load user profile, using defaults:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true)
      // In a real app, get user ID from auth context
      const userId = "1"
      
      await ApiService.request(`/users/profile/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userInfo)
      })
      
      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Failed to save profile:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: keyof UserPreferences, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
    
    // Save preferences immediately
    savePreferences({ ...preferences, [field]: value })
  }

  const savePreferences = async (newPreferences: UserPreferences) => {
    try {
      // In a real app, save to backend
      console.log("Saving preferences:", newPreferences)
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved.",
      })
    } catch (error) {
      console.error("Failed to save preferences:", error)
      toast({
        title: "Save Failed",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleRemoveCard = async (cardId: string) => {
    try {
      // In a real app, call API to remove card
      console.log("Removing card:", cardId)
      toast({
        title: "Card Removed",
        description: "Payment method has been removed successfully.",
      })
    } catch (error) {
      console.error("Failed to remove card:", error)
      toast({
        title: "Removal Failed",
        description: "Failed to remove payment method. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (isLoading && !userInfo.name) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-blue-700">{userInfo.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {userInfo.email}
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Verified
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Premium Member
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              disabled={isLoading}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-blue-200">
          <TabsTrigger value="personal" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
            Payment Methods
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Manage your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-700">Full Name</label>
                  <Input
                    value={userInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-700">Email Address</label>
                  <Input
                    value={userInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-700">Phone Number</label>
                  <Input
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-700">Date of Birth</label>
                  <Input
                    type="date"
                    value={userInfo.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-blue-700">Address</label>
                  <Input
                    value={userInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-700">Nationality</label>
                  <Input
                    value={userInfo.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSaveProfile} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-700">Password</h4>
                    <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-blue-200"
                    onClick={() => {
                      toast({
                        title: "Password Change",
                        description: "Password change functionality would be implemented here.",
                      })
                    }}
                  >
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-700">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-blue-200"
                    onClick={() => {
                      toast({
                        title: "2FA Setup",
                        description: "Two-factor authentication setup would be implemented here.",
                      })
                    }}
                  >
                    Enable 2FA
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-blue-700">Login History</h4>
                    <p className="text-sm text-gray-600">View recent account activity</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-blue-200"
                    onClick={() => {
                      toast({
                        title: "Login History",
                        description: "Login history view would be implemented here.",
                      })
                    }}
                  >
                    View History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Preferences
              </CardTitle>
              <CardDescription>
                Customize your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-700">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Button
                    variant={preferences.emailNotifications ? "default" : "outline"}
                    onClick={() => handlePreferenceChange("emailNotifications", !preferences.emailNotifications)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {preferences.emailNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-700">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <Button
                    variant={preferences.smsNotifications ? "default" : "outline"}
                    onClick={() => handlePreferenceChange("smsNotifications", !preferences.smsNotifications)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {preferences.smsNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-700">Preferred Currency</label>
                    <Input
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Language</label>
                    <Input
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange("language", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-4 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-6 rounded flex items-center justify-center ${
                        card.brand === 'Visa' ? 'bg-blue-600' : 'bg-red-600'
                      }`}>
                        <span className="text-white text-xs font-bold">
                          {card.brand === 'Visa' ? 'VISA' : 'MC'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">•••• •••• •••• {card.last4}</p>
                        <p className="text-sm text-gray-600">
                          Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                        </p>
                      </div>
                    </div>
                    {card.isDefault ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Primary
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveCard(card.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    toast({
                      title: "Add Payment Method",
                      description: "Add new payment method functionality would be implemented here.",
                    })
                  }}
                >
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
