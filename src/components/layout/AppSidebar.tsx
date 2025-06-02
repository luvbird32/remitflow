
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

const menuItems = [
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
    <Sidebar className="border-r border-blue-200 bg-white">
      <SidebarHeader className="p-4">
        <h3 className="text-lg font-semibold text-blue-700">RemitFlow</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`w-full justify-start ${
                      activeTab === item.value
                        ? 'bg-yellow-400 text-blue-700 hover:bg-yellow-500'
                        : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
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
