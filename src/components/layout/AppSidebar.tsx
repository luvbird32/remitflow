
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar className="border-r border-slate-200/30 glass backdrop-blur-xl">
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-bold text-xs uppercase tracking-wider px-3 py-6 border-b border-slate-200/50 mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`group w-full justify-start rounded-2xl p-4 transition-all duration-300 ease-out ${
                      activeTab === item.value
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-2xl shadow-teal-500/25 hover:shadow-teal-500/40 scale-105'
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-slate-800 hover:scale-102 hover:shadow-lg'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-all duration-200 ${
                      activeTab === item.value ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                    <div className="flex flex-col items-start ml-1">
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
  );
}
