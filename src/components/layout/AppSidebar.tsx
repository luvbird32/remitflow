
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
} from "@/components/ui/sidebar";
import { Send, History, TrendingUp, Calculator, Search, User } from 'lucide-react';

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
  return (
    <div className="fixed left-0 top-0 h-screen z-40">
      <Sidebar className="border-r border-slate-200/30 glass backdrop-blur-xl h-full">
        <SidebarHeader className="p-4 border-b border-slate-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text tracking-tight">
                  RemitFlow
                </h1>
                <p className="text-xs text-slate-500 font-medium">Global Money Transfer</p>
              </div>
            </div>
            <SidebarTrigger className="ml-auto" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="p-3 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-500 font-bold text-xs uppercase tracking-wider px-3 py-2 mb-2">
              Navigation
            </SidebarGroupLabel>
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
                      }`}
                    >
                      <item.icon className={`h-5 w-5 transition-all duration-200 ${
                        activeTab === item.value ? 'scale-110' : 'group-hover:scale-105'
                      }`} />
                      <div className="flex flex-col items-start ml-3">
                        <span className="font-semibold text-sm">{item.title}</span>
                        <span className={`text-xs transition-colors ${
                          activeTab === item.value 
                            ? 'text-white/80' 
                            : 'text-slate-400 group-hover:text-slate-500'
                        }`}>
                          {item.description}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
