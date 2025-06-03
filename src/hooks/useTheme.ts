
import { useEffect, useState } from 'react';
import { getColorClasses, getVariantClasses, componentVariants } from '@/config/theme';

/**
 * Custom hook for theme management and color utilities
 * Provides easy access to theme colors and utilities for components
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const getColor = (variant: 'primary' | 'secondary' | 'accent', type: 'bg' | 'text' | 'border' = 'bg') => {
    return getColorClasses(variant, type);
  };

  const getComponentClasses = (component: keyof typeof componentVariants, variant: string) => {
    return getVariantClasses(component, variant);
  };

  return {
    isDark,
    toggleTheme,
    getColor,
    getComponentClasses,
    theme: isDark ? 'dark' : 'light'
  };
}
