
import { Bell, LogOut, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useIsMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  /** Callback function for profile button click */
  onProfileClick?: () => void
}

/**
 * Header component with improved readability and accessibility
 * Features user actions, notifications, and responsive design
 */
export function Header({ onProfileClick }: HeaderProps) {
  const { toast } = useToast()
  const { user, signOut } = useAuth()
  const isMobile = useIsMobile()

  /**
   * Handles notification button click with user feedback
   */
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    })
  }

  /**
   * Handles user sign out with confirmation feedback
   */
  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    })
  }

  /**
   * Handles profile navigation
   */
  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick()
    }
  }

  return (
    <header className="glass backdrop-blur-xl shadow-lg border-b border-slate-200/40 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop Brand Section */}
        {!isMobile && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-800">RemitFlow</span>
          </div>
        )}

        {/* Mobile Profile Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-700 hover:text-teal-600 hover:bg-teal-50/80 rounded-xl transition-all duration-200 hover:scale-105 touch-target"
            onClick={handleProfileClick}
            aria-label="Open user profile"
          >
            <User className="h-5 w-5" />
          </Button>
        )}

        {/* User Actions Section */}
        <div className="flex items-center space-x-2">
          {/* Desktop User Info */}
          {!isMobile && (
            <div className="flex items-center space-x-3 px-4 py-2 modern-card rounded-xl mr-3">
              <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-800">Welcome</span>
                <p className="text-xs text-slate-600 font-medium truncate max-w-24">
                  {user?.name || 'User'}
                </p>
              </div>
            </div>
          )}
          
          {/* Notification Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-slate-700 hover:text-teal-600 hover:bg-teal-50/80 rounded-xl transition-all duration-200 hover:scale-105 ${
              isMobile ? 'touch-target' : 'h-11 w-11'
            }`}
            onClick={handleNotificationClick}
            aria-label="View notifications"
          >
            <Bell className={isMobile ? "h-5 w-5" : "h-5 w-5"} />
          </Button>
          
          {/* Sign Out Button - Enhanced for better readability */}
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-700 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200 hover:scale-105 touch-target border border-red-200/60"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="text-slate-700 hover:text-red-600 hover:bg-red-50/80 hover:border-red-300 rounded-xl transition-all duration-200 hover:scale-105 border-slate-300 px-4 py-2 h-11 font-semibold"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-sm">Sign Out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
