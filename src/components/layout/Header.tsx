
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
    <header className="glass backdrop-blur-xl shadow-xl shadow-slate-900/5 border-b border-slate-200/30 sticky top-0 z-50">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/25 animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text tracking-tight">
                RemitFlow
              </h1>
              <p className="text-xs text-slate-500 font-medium">Global Money Transfer</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-4 px-6 py-3 modern-card rounded-2xl">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-700">Welcome back</span>
              <p className="text-xs text-slate-500 font-medium">{user?.name}</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 hover:text-teal-600 hover:bg-teal-50/80 rounded-2xl h-12 w-12 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 hover:text-coral-500 hover:bg-coral-50/80 rounded-2xl h-12 w-12 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
