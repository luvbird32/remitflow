
import { CreditCard, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RemitFast</h1>
              <p className="text-xs text-gray-500">Fast & Secure Money Transfer</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">2</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-1" />
              Account
            </Button>
            <Button size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
