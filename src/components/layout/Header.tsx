import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-600">RemitFlow</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors">Send Money</a>
          <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors">Track Transfer</a>
          <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors">Exchange Rates</a>
          <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors">Help</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-yellow-500 hover:bg-yellow-50">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-yellow-500 hover:bg-yellow-50">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
