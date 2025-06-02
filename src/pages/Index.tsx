
import { useState } from 'react';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';
import { ExchangeRates } from '@/components/remittance/ExchangeRates';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'history' | 'rates'>('send');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Send Money Worldwide
          </h1>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
              {[
                { id: 'send', label: 'Send Money' },
                { id: 'history', label: 'History' },
                { id: 'rates', label: 'Exchange Rates' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <Card className="p-6">
            {activeTab === 'send' && <TransferForm />}
            {activeTab === 'history' && <TransferHistory />}
            {activeTab === 'rates' && <ExchangeRates />}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
