
import { Button } from "@/components/ui/button";
import { Wallet, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">RemitFlow</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Send Money</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Track Transfer</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
