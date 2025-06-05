
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
        {/* Logo/Brand - Desktop Only */}
        {!isMobile && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800">SendMoney</span>
          </div>
        )}

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
              <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
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
          
          {/* Enhanced Logout Button */}
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-600 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200 hover:scale-105 h-10 w-10 border border-red-200"
              onClick={handleSignOut}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="text-slate-600 hover:text-red-500 hover:bg-red-50/80 hover:border-red-300 rounded-xl transition-all duration-200 hover:scale-105 border-slate-200 px-4 py-2 h-11"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
