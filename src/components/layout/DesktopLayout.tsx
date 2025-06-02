
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { UserProfile } from '@/components/profile/UserProfile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

/**
 * Props interface for the DesktopLayout component
 */
interface DesktopLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Desktop layout component providing sidebar navigation and content area
 * @param activeTab - Currently active navigation tab
 * @param onTabChange - Function to handle tab changes
 * @returns JSX element containing the desktop layout
 */
export function DesktopLayout({ activeTab, onTabChange }: DesktopLayoutProps) {
  /**
   * Renders content based on the active tab
   * @returns JSX element for the active tab content
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'send':
        return <TransferForm />;
      case 'track':
        return <TrackTransfer />;
      case 'calculator':
        return <ExchangeCalculator />;
      case 'history':
        return <TransferHistory />;
      case 'rates':
        return <ExchangeRates />;
      case 'profile':
        return <UserProfile />;
      default:
        return <TransferForm />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <AppSidebar activeTab={activeTab} onTabChange={onTabChange} />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-6 py-12">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
                Send Money Worldwide
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Experience fast, secure, and affordable international money transfers with our cutting-edge platform
              </p>
              <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Instant Transfers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Low Fees</span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
