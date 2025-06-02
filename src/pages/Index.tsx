
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { DesktopLayout } from '@/components/layout/DesktopLayout';

const Index = () => {
  const [activeTab, setActiveTab] = useState('send');
  const isMobile = useIsMobile();
  const { isAuthenticated, signIn } = useAuth();

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={signIn} />;
  }

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout activeTab={activeTab} onTabChange={setActiveTab} />;
};

export default Index;
