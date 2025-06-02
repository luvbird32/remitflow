
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { DesktopLayout } from '@/components/layout/DesktopLayout';

const Index = () => {
  const [activeTab, setActiveTab] = useState('send');
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout activeTab={activeTab} onTabChange={setActiveTab} />;
};

export default Index;
