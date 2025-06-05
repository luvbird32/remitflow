
/**
 * Centralized theme configuration for the RemitFlow application
 * 
 * This file contains all theme-related constants and utilities
 * for maintaining consistency across the application.
 * Enhanced for better readability and accessibility.
 */

/**
 * Primary brand colors used throughout the application
 */
export const brandColors = {
  /** Main brand color - used for primary actions and highlights */
  primary: 'teal',
  /** Secondary brand color - used for accents and secondary actions */
  secondary: 'coral',
  /** Neutral color palette - used for text, borders, and backgrounds */
  neutral: 'slate'
} as const;

/**
 * Extended color palette with specific shade values
 * Provides consistent color usage across components
 */
export const colorPalette = {
  /** Teal color palette - primary brand color */
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',  // Primary teal
    700: '#0f766e',  // Darker teal for better contrast
    800: '#115e59',
    900: '#134e4a',
  },
  /** Coral color palette - secondary brand color */
  coral: {
    50: '#fef7f0',
    100: '#feecdc',
    200: '#fcd9bd',
    300: '#fdba8c',
    400: '#ff8a4c',
    500: '#ff5722',
    600: '#ea580c',  // Primary coral
    700: '#c2410c',  // Darker coral for better contrast
    800: '#9a3412',
    900: '#7c2d12',
  }
} as const;

/**
 * Semantic color mappings for consistent theming
 * Supports both light and dark themes
 */
export const semanticColors = {
  /** Light theme color definitions */
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
  /** Dark theme color definitions */
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

/**
 * Component variant mappings for consistent styling
 * Each component type has predefined style variants
 */
export const componentVariants = {
  /** Button component variants */
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  },
  /** Card component variants */
  card: {
    default: 'modern-card',
    hover: 'modern-card-hover',
    glass: 'glass',
    highlighted: 'modern-card border-2 border-coral-200 bg-coral-50/30',
  },
  /** Input component variants */
  input: {
    default: 'form-input',
    error: 'form-input border-red-500 focus:border-red-500 focus:ring-red-100',
  }
} as const;

/**
 * Animation class mappings for consistent motion design
 */
export const animations = {
  /** Entry animations for new elements */
  entrance: 'animate-fade-in',
  /** Slide animations for panels and modals */
  slide: 'animate-slide-up',
  /** Scale animations for emphasis */
  scale: 'animate-scale-in',
  /** Floating animations for decorative elements */
  float: 'animate-float',
  /** Hover animations for interactive elements */
  hover: 'hover-scale',
} as const;

/**
 * Typography scale for consistent text sizing
 */
export const typography = {
  /** Large headings for page titles */
  'heading-primary': 'heading-primary',
  /** Section headings */
  'heading-secondary': 'heading-secondary',
  /** Subsection headings */
  'heading-tertiary': 'heading-tertiary',
  /** Large body text for emphasis */
  'body-large': 'body-large',
  /** Regular body text */
  'body-regular': 'body-regular',
  /** Small text for captions and notes */
  'body-small': 'body-small',
} as const;

/**
 * Utility function to get consistent color classes
 * @param variant - The color variant to use
 * @param type - The CSS property type (bg, text, border)
 * @returns String of Tailwind classes
 */
export const getColorClasses = (
  variant: 'primary' | 'secondary' | 'accent', 
  type: 'bg' | 'text' | 'border' = 'bg'
) => {
  const colorMap = {
    primary: 'primary',
    secondary: 'secondary', 
    accent: 'accent'
  };
  
  return `${type}-${colorMap[variant]}`;
};

/**
 * Utility function to get component variant classes
 * @param component - The component type
 * @param variant - The variant name
 * @returns String of CSS classes for the variant
 */
export const getVariantClasses = (
  component: keyof typeof componentVariants, 
  variant: string
) => {
  return componentVariants[component][variant as keyof typeof componentVariants[typeof component]] || '';
};

/**
 * Accessibility helper function to ensure proper contrast ratios
 * @param backgroundColor - Background color value
 * @param textColor - Text color value
 * @returns Boolean indicating if contrast meets WCAG AA standards
 */
export const checkContrast = (backgroundColor: string, textColor: string): boolean => {
  // This would typically include actual contrast calculation logic
  // For now, it returns true as a placeholder
  return true;
};
