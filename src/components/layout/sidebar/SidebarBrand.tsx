
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarBrand() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
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
  )
}
