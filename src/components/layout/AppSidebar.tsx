
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Send, History, TrendingUp, Calculator, Search, User, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface MenuItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const menuItems: MenuItem[] = [
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
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-slate-200/30 glass backdrop-blur-xl transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className="p-4 border-b border-slate-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-110">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <h1 className="text-lg font-bold gradient-text tracking-tight">
                  RemitFlow
                </h1>
                <p className="text-xs text-slate-500 font-medium">Global Money Transfer</p>
              </div>
            )}
          </div>
          <SidebarTrigger className="ml-auto hover:bg-slate-100 transition-colors" />
        </div>
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
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`group w-full justify-start rounded-xl p-3 transition-all duration-300 ease-out ${
                      activeTab === item.value
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 scale-[1.02]'
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-slate-800 hover:scale-[1.01] hover:shadow-md'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`h-5 w-5 transition-all duration-200 ${
                      activeTab === item.value ? 'scale-110' : 'group-hover:scale-105'
                    } ${isCollapsed ? 'mx-auto' : ''}`} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start ml-1 transition-opacity duration-200">
                        <span className="font-semibold text-sm">{item.title}</span>
                        <span className={`text-xs transition-colors ${
                          activeTab === item.value 
                            ? 'text-white/80' 
                            : 'text-slate-400 group-hover:text-slate-500'
                        }`}>
                          {item.description}
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
  );
}
