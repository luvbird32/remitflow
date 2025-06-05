
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { UserProfile } from '@/components/profile/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, History, TrendingUp, Calculator, Search, User } from 'lucide-react';
import { useState } from 'react';

/**
 * Mobile-optimized layout component with bottom navigation
 * Provides a responsive design for smaller screens
 */
export function MobileLayout() {
  const [activeTab, setActiveTab] = useState('send');

  /**
   * Handles profile navigation from header
   */
  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onProfileClick={handleProfileClick} />
      
      <main className="container mx-auto px-4 py-6 pb-24 content-spacing">
        {/* Hero Section - Mobile optimized */}
        <div className="text-center mb-8">
          {/* App icon with improved contrast */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-4 shadow-xl animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          
          {/* Title with better mobile typography */}
          <h2 className="heading-secondary gradient-text mb-3">
            Send Money Worldwide
          </h2>
          
          {/* Subtitle with improved readability */}
          <p className="body-regular text-slate-600 px-2 leading-relaxed max-w-sm mx-auto">
            Fast, secure, and affordable transfers at your fingertips
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Fixed bottom navigation with improved contrast */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-xl">
            <TabsList className="grid w-full grid-cols-5 bg-transparent border-none p-3 h-auto">
              <TabsTrigger 
                value="send" 
                className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800 touch-target"
              >
                <Send className="h-5 w-5" />
                <span className="text-xs font-semibold">Send</span>
              </TabsTrigger>
              <TabsTrigger 
                value="track" 
                className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800 touch-target"
              >
                <Search className="h-5 w-5" />
                <span className="text-xs font-semibold">Status</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800 touch-target"
              >
                <Calculator className="h-5 w-5" />
                <span className="text-xs font-semibold">Calculate</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800 touch-target"
              >
                <History className="h-5 w-5" />
                <span className="text-xs font-semibold">History</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rates" 
                className="flex flex-col items-center gap-2 py-3 px-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800 touch-target"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs font-semibold">Rates</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab content with consistent spacing */}
          <TabsContent value="send" className="mt-6">
            <TransferForm />
          </TabsContent>

          <TabsContent value="track" className="mt-6">
            <TrackTransfer />
          </TabsContent>

          <TabsContent value="calculator" className="mt-6">
            <ExchangeCalculator />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <TransferHistory />
          </TabsContent>

          <TabsContent value="rates" className="mt-6">
            <ExchangeRates />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
