
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

/**
 * Props interface for the AppSidebar component
 */
interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Menu item interface
 */
interface MenuItem {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Navigation menu items configuration
 */
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

/**
 * Application sidebar component with navigation menu
 * @param activeTab - Currently active navigation tab
 * @param onTabChange - Function to handle tab changes
 * @returns JSX element containing the sidebar navigation
 */
export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200/50 bg-white/80 backdrop-blur-md">
      <SidebarHeader className="p-6 border-b border-slate-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700'
                        : 'text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-slate-800'
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
