
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
import { Send, History, TrendingUp, Calculator, Search, User, ChevronRight } from 'lucide-react';

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
      <Sidebar className="border-r border-slate-200/40 glass backdrop-blur-xl h-full transition-all duration-300 ease-out">
        <SidebarHeader className="p-6 border-b border-slate-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-110 hover:rotate-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text tracking-tight">
                  RemitFlow
                </h1>
                <p className="text-xs text-slate-500 font-medium">Global Money Transfer</p>
              </div>
            </div>
            <SidebarTrigger className="ml-auto p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="p-4 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-500 font-bold text-xs uppercase tracking-wider px-3 py-3 mb-3">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.value)}
                      isActive={activeTab === item.value}
                      className={`group w-full justify-start rounded-2xl p-4 transition-all duration-300 ease-out relative overflow-hidden ${
                        activeTab === item.value
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 scale-[1.02] border-0'
                          : 'text-slate-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-slate-800 hover:scale-[1.01] hover:shadow-md border border-transparent hover:border-teal-100'
                      }`}
                    >
                      <div className="flex items-center w-full">
                        <item.icon className={`h-5 w-5 transition-all duration-300 ${
                          activeTab === item.value ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-105'
                        }`} />
                        <div className="flex flex-col items-start ml-4 flex-1">
                          <span className="font-semibold text-sm leading-tight">{item.title}</span>
                          <span className={`text-xs transition-colors leading-tight ${
                            activeTab === item.value 
                              ? 'text-white/80' 
                              : 'text-slate-400 group-hover:text-slate-500'
                          }`}>
                            {item.description}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 ml-2 transition-all duration-300 ${
                          activeTab === item.value 
                            ? 'text-white/60 translate-x-1' 
                            : 'text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                      
                      {/* Animated background for hover effect */}
                      {activeTab !== item.value && (
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* Status indicator at bottom */}
          <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full animate-pulse shadow-sm shadow-teal-500/50"></div>
              <div>
                <p className="text-xs font-semibold text-slate-700">System Status</p>
                <p className="text-xs text-slate-500">All services operational</p>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
