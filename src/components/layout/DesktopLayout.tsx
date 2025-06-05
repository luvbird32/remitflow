
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
  /** Currently active tab identifier */
  activeTab: string;
  /** Callback function to handle tab changes */
  onTabChange: (tab: string) => void;
}

/**
 * Desktop layout component that provides the main application structure
 * Features a collapsible sidebar and dynamic content area
 */
export function DesktopLayout({ activeTab, onTabChange }: DesktopLayoutProps) {
  /**
   * Renders the appropriate content based on the active tab
   * @returns JSX element corresponding to the selected tab
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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar activeTab={activeTab} onTabChange={onTabChange} />
        
        <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
          <main className="flex-1 container mx-auto px-6 sm:px-8 section-spacing">
            {/* Hero Section - Improved typography and spacing */}
            <div className="text-center animate-fade-in mb-12 sm:mb-16">
              {/* Icon with improved styling */}
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-teal-600 rounded-3xl mb-6 sm:mb-8 shadow-2xl shadow-teal-600/25 animate-float">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              
              {/* Main heading with improved typography */}
              <h1 className="heading-primary gradient-text max-w-4xl mx-auto">
                Send Money Worldwide
              </h1>
              
              {/* Subtitle with better contrast and spacing */}
              <p className="body-large max-w-3xl mx-auto text-slate-600 font-medium">
                Experience lightning-fast, secure, and affordable international money transfers 
                with our cutting-edge platform designed for the modern world
              </p>
              
              {/* Feature indicators with improved styling */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="flex items-center space-x-3 group cursor-default">
                  <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse shadow-lg shadow-teal-500/50"></div>
                  <span className="body-regular text-slate-700 font-semibold group-hover:text-teal-700 transition-colors">
                    Instant Transfers
                  </span>
                </div>
                <div className="flex items-center space-x-3 group cursor-default">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{animationDelay: '0.5s'}}></div>
                  <span className="body-regular text-slate-700 font-semibold group-hover:text-blue-700 transition-colors">
                    Bank-Level Security
                  </span>
                </div>
                <div className="flex items-center space-x-3 group cursor-default">
                  <div className="w-4 h-4 bg-coral-500 rounded-full animate-pulse shadow-lg shadow-coral-500/50" style={{animationDelay: '1s'}}></div>
                  <span className="body-regular text-slate-700 font-semibold group-hover:text-coral-700 transition-colors">
                    Minimal Fees
                  </span>
                </div>
              </div>
            </div>

            {/* Content area with improved container */}
            <div className="max-w-5xl mx-auto animate-slide-up">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
