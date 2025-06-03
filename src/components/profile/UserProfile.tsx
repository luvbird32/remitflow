
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Shield, Bell, CreditCard, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ApiService } from "@/services/apiService"
import { UserInfo, UserPreferences, SavedCard, UserProfileResponse } from "./types"

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
      const profile = await ApiService.getUserProfile(userId) as UserProfileResponse
      
      if (profile) {
        setUserInfo({
          name: profile.name || userInfo.name,
          email: profile.email || userInfo.email,
          phone: profile.phone || userInfo.phone,
          address: profile.address || userInfo.address,
          dateOfBirth: profile.dateOfBirth || userInfo.dateOfBirth,
          nationality: profile.nationality || userInfo.nationality
        })

        if (profile.preferences) {
          setPreferences(profile.preferences)
        }
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
      
      await ApiService.updateUserProfile(userId, userInfo)
      
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
      const userId = "1"
      await ApiService.updateUserPreferences(userId, newPreferences)
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
      const userId = "1"
      await ApiService.removePaymentMethod(userId, cardId)
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
      <div className="space-y-4 px-4">
        <div className="animate-pulse">
          <div className="h-24 sm:h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-64 sm:h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-2 sm:px-4">
      {/* Profile Header - Responsive */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <CardTitle className="text-lg sm:text-xl text-slate-700 break-words">{userInfo.name}</CardTitle>
                <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mx-auto sm:mx-0" />
                  <span className="break-all">{userInfo.email}</span>
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                    Verified
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                    Premium Member
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
              className="border-teal-200 text-teal-600 hover:bg-teal-50 w-full sm:w-auto text-xs sm:text-sm"
              disabled={isLoading}
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs - Mobile Optimized */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white border border-slate-200 h-auto p-1">
          <TabsTrigger 
            value="personal" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm py-2 px-1"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm py-2 px-1"
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm py-2 px-1"
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="payment" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm py-2 px-1"
          >
            Payment
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Full Name</label>
                  <Input
                    value={userInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Email Address</label>
                  <Input
                    value={userInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Phone Number</label>
                  <Input
                    value={userInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Date of Birth</label>
                  <Input
                    type="date"
                    value={userInfo.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Address</label>
                  <Input
                    value={userInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Nationality</label>
                  <Input
                    value={userInfo.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    disabled={!isEditing}
                    className="text-sm"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button 
                    onClick={handleSaveProfile} 
                    className="bg-teal-600 hover:bg-teal-700 text-sm w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">Password</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Last changed 30 days ago</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-teal-200 text-teal-600 hover:bg-teal-50 w-full sm:w-auto text-xs sm:text-sm"
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">Two-Factor Authentication</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-teal-200 text-teal-600 hover:bg-teal-50 w-full sm:w-auto text-xs sm:text-sm"
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">Login History</h4>
                    <p className="text-xs sm:text-sm text-gray-600">View recent account activity</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-teal-200 text-teal-600 hover:bg-teal-50 w-full sm:w-auto text-xs sm:text-sm"
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
        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                Preferences
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Customize your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">Email Notifications</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Button
                    variant={preferences.emailNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePreferenceChange("emailNotifications", !preferences.emailNotifications)}
                    className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    {preferences.emailNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base">SMS Notifications</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <Button
                    variant={preferences.smsNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePreferenceChange("smsNotifications", !preferences.smsNotifications)}
                    className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    {preferences.smsNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Preferred Currency</label>
                    <Input
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-slate-700 block mb-1">Language</label>
                    <Input
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange("language", e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                Payment Methods
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div key={card.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-5 sm:w-10 sm:h-6 rounded flex items-center justify-center ${
                        card.brand === 'Visa' ? 'bg-blue-600' : 'bg-red-600'
                      }`}>
                        <span className="text-white text-xs font-bold">
                          {card.brand === 'Visa' ? 'VISA' : 'MC'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 text-sm sm:text-base">•••• •••• •••• {card.last4}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Expires {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                        </p>
                      </div>
                    </div>
                    {card.isDefault ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs w-fit">
                        Primary
                      </Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveCard(card.id)}
                        className="text-xs sm:text-sm w-full sm:w-auto"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 text-sm"
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
