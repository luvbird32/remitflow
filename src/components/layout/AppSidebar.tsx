
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Send, History, TrendingUp, Calculator, Search, User, Bell, LogOut } from 'lucide-react'
import { SidebarBrand } from './sidebar/SidebarBrand'
import { SidebarMenuItemComponent } from './sidebar/SidebarMenuItem'
import { SidebarToggle } from './sidebar/SidebarToggle'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  {
    title: "Send Money",
    value: "send",
    icon: Send,
    description: "Send money globally"
  },
  {
    title: "Check Status",
    value: "track",
    icon: Search,
    description: "Track your transfers"
  },
  {
    title: "Calculate",
    value: "calculator",
    icon: Calculator,
    description: "Calculate rates"
  },
  {
    title: "History",
    value: "history",
    icon: History,
    description: "Past transfers"
  },
  {
    title: "Current Rates",
    value: "rates",
    icon: TrendingUp,
    description: "Live exchange rates"
  },
  {
    title: "Profile",
    value: "profile",
    icon: User,
    description: "Your account"
  },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
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
    <div className="relative">
      <Sidebar 
        collapsible="icon" 
        className="border-r border-slate-200/30 glass transition-all duration-300 ease-in-out"
      >
        <SidebarHeader className="p-4 border-b border-slate-200/30">
          <SidebarBrand />
        </SidebarHeader>
        
        <SidebarContent className="p-3 flex flex-col">
          {/* Welcome Section at Top */}
          {!isCollapsed && user && (
            <div className="flex items-center space-x-3 px-3 py-2 mb-4 modern-card rounded-xl">
              <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-700">Welcome</span>
                <p className="text-xs text-slate-500 font-medium truncate max-w-20">{user?.name}</p>
              </div>
            </div>
          )}

          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-slate-500 font-bold text-xs uppercase tracking-wider px-3 py-2 mb-2 transition-opacity duration-200">
                Menu
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItemComponent
                    key={item.value}
                    item={item}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Actions Section */}
          <div className="mt-auto border-t border-slate-200/30 pt-3">
            <div className="space-y-2 px-2">
              {/* Notification Button */}
              <Button 
                variant="ghost" 
                size={isCollapsed ? "icon" : "sm"}
                className="w-full justify-start text-slate-600 hover:text-teal-600 hover:bg-teal-50/80 rounded-xl transition-all duration-200 hover:scale-105"
                onClick={handleNotificationClick}
              >
                <Bell className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2 text-sm font-medium">Notifications</span>}
              </Button>

              {/* Sign Out Button */}
              <Button 
                variant="ghost" 
                size={isCollapsed ? "icon" : "sm"}
                className="w-full justify-start text-slate-600 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200 hover:scale-105"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2 text-sm font-medium">Sign Out</span>}
              </Button>
            </div>
          </div>

          {!isCollapsed && (
            <div className="mt-3 p-3 border-t border-slate-200/30 transition-opacity duration-200">
              <div className="text-xs text-slate-400 text-center">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>B
                </kbd>
                <span className="ml-1">to toggle sidebar</span>
              </div>
            </div>
          )}
        </SidebarContent>
      </Sidebar>
      
      <SidebarToggle />
    </div>
  )
}
