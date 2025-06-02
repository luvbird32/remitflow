
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
}

const menuItems: MenuItem[] = [
  {
    title: "Send Money",
    value: "send",
    icon: Send,
  },
  {
    title: "Track Transfer",
    value: "track",
    icon: Search,
  },
  {
    title: "Calculator",
    value: "calculator",
    icon: Calculator,
  },
  {
    title: "History",
    value: "history",
    icon: History,
  },
  {
    title: "Exchange Rates",
    value: "rates",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    value: "profile",
    icon: User,
  },
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200/50 bg-white/90 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
            RemitFlow
          </h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-medium px-4 py-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`w-full justify-start rounded-xl transition-all duration-200 ${
                      activeTab === item.value
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:from-teal-600 hover:to-cyan-600'
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-slate-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
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
