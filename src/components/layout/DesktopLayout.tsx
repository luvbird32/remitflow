
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { UserProfile } from '@/components/profile/UserProfile';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

interface DesktopLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DesktopLayout({ activeTab, onTabChange }: DesktopLayoutProps) {
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-yellow-50">
        <AppSidebar activeTab={activeTab} onTabChange={onTabChange} />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-blue-700 mb-2">
                Send Money Worldwide
              </h2>
              <p className="text-blue-600 text-lg">
                Fast, secure, and affordable international money transfers
              </p>
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
