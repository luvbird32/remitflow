
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

export function SidebarToggle() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div className={`absolute top-4 transition-all duration-300 z-50 ${
      isCollapsed ? 'right-2' : 'right-4'
    }`}>
      <SidebarTrigger className="
        w-10 h-10 p-2
        bg-white/90 hover:bg-white shadow-lg hover:shadow-xl 
        border border-slate-200/50 hover:border-slate-300 
        rounded-xl transition-all duration-200 
        flex items-center justify-center
        hover:scale-105 active:scale-95
        backdrop-blur-sm
      ">
        {isCollapsed ? (
          <PanelLeftOpen className="h-5 w-5 text-slate-700" />
        ) : (
          <PanelLeftClose className="h-5 w-5 text-slate-700" />
        )}
      </SidebarTrigger>
    </div>
  )
}
