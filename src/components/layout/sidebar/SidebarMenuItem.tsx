
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

interface MenuItem {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface SidebarMenuItemProps {
  item: MenuItem
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SidebarMenuItemComponent({ item, activeTab, onTabChange }: SidebarMenuItemProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenuItem>
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
  )
}
