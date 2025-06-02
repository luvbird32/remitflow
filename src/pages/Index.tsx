
import { Header } from '@/components/layout/Header';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { ExchangeCalculator } from '@/components/remittance/ExchangeCalculator';
import { TrackTransfer } from '@/components/remittance/TrackTransfer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, History, TrendingUp, Calculator, Search } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-2">
            Send Money Worldwide
          </h2>
          <p className="text-blue-600 text-lg">
            Fast, secure, and affordable international money transfers
          </p>
        </div>

        <Tabs defaultValue="send" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-blue-200">
            <TabsTrigger value="send" className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
              <Send className="h-4 w-4" />
              Send Money
            </TabsTrigger>
            <TabsTrigger value="track" className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
              <Search className="h-4 w-4" />
              Track Transfer
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="rates" className="flex items-center gap-2 data-[state=active]:bg-yellow-400 data-[state=active]:text-blue-700">
              <TrendingUp className="h-4 w-4" />
              Exchange Rates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send">
            <TransferForm />
          </TabsContent>

          <TabsContent value="track">
            <TrackTransfer />
          </TabsContent>

          <TabsContent value="calculator">
            <ExchangeCalculator />
          </TabsContent>

          <TabsContent value="history">
            <TransferHistory />
          </TabsContent>

          <TabsContent value="rates">
            <ExchangeRates />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
