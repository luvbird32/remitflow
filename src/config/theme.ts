
/**
 * Centralized theme configuration for the application
 * 
 * This file contains all theme-related constants and utilities
 * for maintaining consistency across the application.
 */

export const brandColors = {
  primary: 'teal',
  secondary: 'coral',
  neutral: 'slate'
} as const;

export const colorPalette = {
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  coral: {
    50: '#fef7f0',
    100: '#feecdc',
    200: '#fcd9bd',
    300: '#fdba8c',
    400: '#ff8a4c',
    500: '#ff5722',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  }
} as const;

export const semanticColors = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(200 50% 15%)',
    primary: 'hsl(174 72% 56%)',
    'primary-foreground': 'hsl(0 0% 98%)',
    secondary: 'hsl(200 50% 96%)',
    'secondary-foreground': 'hsl(200 50% 15%)',
    accent: 'hsl(14 100% 70%)',
    'accent-foreground': 'hsl(0 0% 98%)',
    muted: 'hsl(200 30% 94%)',
    'muted-foreground': 'hsl(200 30% 45%)',
    border: 'hsl(200 30% 82%)',
  },
  dark: {
    background: 'hsl(200 50% 4%)',
    foreground: 'hsl(0 0% 98%)',
    primary: 'hsl(174 72% 60%)',
    'primary-foreground': 'hsl(200 50% 10%)',
    secondary: 'hsl(200 30% 15%)',
    'secondary-foreground': 'hsl(0 0% 98%)',
    accent: 'hsl(14 100% 65%)',
    'accent-foreground': 'hsl(0 0% 98%)',
    muted: 'hsl(200 30% 15%)',
    'muted-foreground': 'hsl(200 30% 65%)',
    border: 'hsl(200 30% 15%)',
  }
} as const;

export const componentVariants = {
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  },
  card: {
    default: 'modern-card',
    hover: 'modern-card-hover',
    glass: 'glass',
    highlighted: 'modern-card border-2 border-coral-200 bg-gradient-to-r from-coral-50 to-orange-50',
  },
  input: {
    default: 'form-input',
    error: 'form-input border-red-500 focus:border-red-500 focus:ring-red-100',
  }
} as const;

export const animations = {
  entrance: 'animate-fade-in',
  slide: 'animate-slide-up',
  scale: 'animate-scale-in',
  float: 'animate-float',
  hover: 'hover-scale',
} as const;

/**
 * Utility function to get consistent color classes
 */
export const getColorClasses = (variant: 'primary' | 'secondary' | 'accent', type: 'bg' | 'text' | 'border' = 'bg') => {
  const colorMap = {
    primary: 'primary',
    secondary: 'secondary', 
    accent: 'accent'
  };
  
  return `${type}-${colorMap[variant]}`;
};

/**
 * Utility function to get component variant classes
 */
export const getVariantClasses = (component: keyof typeof componentVariants, variant: string) => {
  return componentVariants[component][variant as keyof typeof componentVariants[typeof component]] || '';
};
