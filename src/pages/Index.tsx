
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { DesktopLayout } from '@/components/layout/DesktopLayout';

/**
 * Main index page component that handles authentication and layout routing
 * @returns JSX element containing either auth screen or main app layout
 */
const Index = () => {
  const [activeTab, setActiveTab] = useState('send');
  const isMobile = useIsMobile();
  const { isAuthenticated, signIn } = useAuth();

  // Show authentication screen if user is not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={signIn} />;
  }

  // Show mobile layout on mobile devices
  if (isMobile) {
    return <MobileLayout />;
  }

  // Show desktop layout on larger screens
  return <DesktopLayout activeTab={activeTab} onTabChange={setActiveTab} />;
};

export default Index;
