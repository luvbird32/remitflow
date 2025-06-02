
import { CreditCard } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900">RemitFast</h1>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Login</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
