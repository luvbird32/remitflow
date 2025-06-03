
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { UserProfile } from '@/components/profile/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, History, TrendingUp, Calculator, Search, User } from 'lucide-react';

export function MobileLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-coral-50">
      <Header />
      
      <main className="container mx-auto px-3 py-4 pb-20">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl mb-4 shadow-xl animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-500 to-coral-500 bg-clip-text text-transparent mb-2">
            Send Money Worldwide
          </h2>
          <p className="text-slate-600 text-sm px-4 leading-relaxed">
            Fast, secure, and affordable transfers at your fingertips
          </p>
        </div>

        <Tabs defaultValue="send" className="space-y-4">
          {/* Fixed bottom navigation for better mobile UX */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200/50 shadow-lg">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-none p-2 h-auto">
              <TabsTrigger 
                value="send" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <Send className="h-5 w-5" />
                <span className="text-xs font-medium">Send</span>
              </TabsTrigger>
              <TabsTrigger 
                value="track" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <Search className="h-5 w-5" />
                <span className="text-xs font-medium">Track</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <Calculator className="h-5 w-5" />
                <span className="text-xs font-medium">Calculator</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Secondary navigation for additional features */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-md rounded-2xl p-1">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-none h-auto">
              <TabsTrigger 
                value="history" 
                className="flex flex-col items-center gap-1 py-2 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <History className="h-4 w-4" />
                <span className="text-xs font-medium">History</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rates" 
                className="flex flex-col items-center gap-1 py-2 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Rates</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex flex-col items-center gap-1 py-2 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-800"
              >
                <User className="h-4 w-4" />
                <span className="text-xs font-medium">Profile</span>
              </TabsTrigger>
            </TabsList>
          </div>

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
