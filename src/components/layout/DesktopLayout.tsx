
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransferForm } from '@/components/remittance/TransferForm';
import { TransferHistory } from '@/components/remittance/TransferHistory';

interface DesktopLayoutProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function DesktopLayout({ activeTab, onTabChange }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">RemitFlow - International Money Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="send">Send Money</TabsTrigger>
                <TabsTrigger value="history">Transfer History</TabsTrigger>
              </TabsList>
              <TabsContent value="send">
                <TransferForm />
              </TabsContent>
              <TabsContent value="history">
                <TransferHistory />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
