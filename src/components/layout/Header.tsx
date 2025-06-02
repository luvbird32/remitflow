

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-yellow-500 hover:bg-yellow-50">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

