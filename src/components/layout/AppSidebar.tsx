
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
import { Send, History, TrendingUp, Calculator, Search, User } from 'lucide-react'
import { SidebarBrand } from './sidebar/SidebarBrand'
import { SidebarMenuItemComponent } from './sidebar/SidebarMenuItem'
import { SidebarToggle } from './sidebar/SidebarToggle'

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  {
    title: "Send Money",
    value: "send",
    icon: Send,
    description: "Transfer funds globally"
  },
  {
    title: "Track Transfer",
    value: "track",
    icon: Search,
    description: "Monitor your transfers"
  },
  {
    title: "Calculator",
    value: "calculator",
    icon: Calculator,
    description: "Calculate exchange rates"
  },
  {
    title: "History",
    value: "history",
    icon: History,
    description: "View past transactions"
  },
  {
    title: "Exchange Rates",
    value: "rates",
    icon: TrendingUp,
    description: "Live market rates"
  },
  {
    title: "Profile",
    value: "profile",
    icon: User,
    description: "Account settings"
  },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div className="relative">
      <Sidebar 
        collapsible="icon" 
        className="border-r border-slate-200/30 glass backdrop-blur-xl transition-all duration-300 ease-in-out"
      >
        <SidebarHeader className="p-4 border-b border-slate-200/30">
          <SidebarBrand />
        </SidebarHeader>
        
        <SidebarContent className="p-3">
          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-slate-500 font-bold text-xs uppercase tracking-wider px-3 py-2 mb-2 transition-opacity duration-200">
                Navigation
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

          {!isCollapsed && (
            <div className="mt-auto p-3 border-t border-slate-200/30 transition-opacity duration-200">
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
