
import { Bell, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
  const { toast } = useToast()
  const { user, signOut } = useAuth()

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    })
  }

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    })
  }

  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-blue-700">RemitFlow</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <User className="h-4 w-4" />
            <span>Welcome, {user?.name}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-600 hover:text-yellow-500 hover:bg-yellow-50"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-blue-600 hover:text-red-500 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
