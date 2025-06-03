
import { Bell, LogOut, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useIsMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  onProfileClick?: () => void
}

export function Header({ onProfileClick }: HeaderProps) {
  const { toast } = useToast()
  const { user, signOut } = useAuth()
  const isMobile = useIsMobile()

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

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    }
  }

  return (
    <header className="glass backdrop-blur-xl shadow-lg border-b border-slate-200/30 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Profile Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 hover:text-teal-600 hover:bg-teal-50/80 rounded-xl transition-all duration-200 hover:scale-105 h-10 w-10"
            onClick={handleProfileClick}
          >
            <User className="h-4 w-4" />
          </Button>
        )}

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <div className="flex items-center space-x-3 px-4 py-2 modern-card rounded-xl mr-2">
              <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-700">Welcome</span>
                <p className="text-xs text-slate-500 font-medium truncate max-w-20">{user?.name}</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-slate-600 hover:text-teal-600 hover:bg-teal-50/80 rounded-xl transition-all duration-200 hover:scale-105 ${
              isMobile ? 'h-10 w-10' : 'h-11 w-11'
            }`}
            onClick={handleNotificationClick}
          >
            <Bell className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-slate-600 hover:text-coral-500 hover:bg-coral-50/80 rounded-xl transition-all duration-200 hover:scale-105 ${
              isMobile ? 'h-10 w-10' : 'h-11 w-11'
            }`}
            onClick={handleSignOut}
          >
            <LogOut className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
          </Button>
        </div>
      </div>
    </header>
  )
}
