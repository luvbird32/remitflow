
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { UserProfile } from '@/components/profile/UserProfile';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';

interface DesktopLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function DesktopLayoutContent({ activeTab, onTabChange }: DesktopLayoutProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
    <div className="min-h-screen flex w-full gradient-bg">
      <AppSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-8 py-16">
          <div className="mb-16 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl mb-8 shadow-2xl shadow-teal-500/25 animate-float">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-6xl font-bold gradient-text mb-6 tracking-tight">
              Send Money Worldwide
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Experience lightning-fast, secure, and affordable international money transfers with our cutting-edge platform designed for the modern world
            </p>
            <div className="mt-10 flex items-center justify-center space-x-12 text-sm">
              <div className="flex items-center space-x-3 group cursor-default">
                <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full animate-pulse shadow-lg shadow-teal-500/50"></div>
                <span className="text-slate-600 font-semibold group-hover:text-teal-600 transition-colors">Instant Transfers</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-default">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50" style={{animationDelay: '0.5s'}}></div>
                <span className="text-slate-600 font-semibold group-hover:text-cyan-600 transition-colors">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-default">
                <div className="w-3 h-3 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full animate-pulse shadow-lg shadow-coral-500/50" style={{animationDelay: '1s'}}></div>
                <span className="text-slate-600 font-semibold group-hover:text-coral-600 transition-colors">Minimal Fees</span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto animate-slide-up">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export function DesktopLayout({ activeTab, onTabChange }: DesktopLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DesktopLayoutContent activeTab={activeTab} onTabChange={onTabChange} />
    </SidebarProvider>
  );
}
