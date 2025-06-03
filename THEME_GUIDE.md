
# Theme Guide for Contributors

## Overview
This project uses a hybrid theming approach combining CSS custom properties with Tailwind CSS for maximum flexibility and maintainability.

## Color System

### Primary Colors
- **Teal**: Main brand color for primary actions and highlights
- **Coral**: Secondary brand color for accents and secondary actions
- **Slate**: Neutral colors for text, borders, and backgrounds

### Semantic Color Tokens
```css
/* Light Theme */
--primary: 174 72% 56%        /* Teal-500 */
--secondary: 200 50% 96%      /* Light slate */
--accent: 14 100% 70%         /* Coral-400 */
--background: 0 0% 100%       /* White */
--foreground: 200 50% 15%     /* Dark slate */

/* Dark Theme */
--primary: 174 72% 60%        /* Lighter teal */
--accent: 14 100% 65%         /* Lighter coral */
--background: 200 50% 4%      /* Dark slate */
--foreground: 0 0% 98%        /* Light text */
```

## How to Modify Colors

### 1. Changing Brand Colors
Edit `src/config/theme.ts` to modify brand colors:
```typescript
export const brandColors = {
  primary: 'teal',
  secondary: 'coral',
  // Add new brand colors here
}
```

### 2. Adding New Color Variants
Add to `tailwind.config.ts` under `extend.colors`:
```typescript
'your-color': {
  50: '#...',
  500: '#...',
  900: '#...',
}
```

### 3. Component Color Usage
Use semantic color classes for consistency:
- `bg-primary` for primary backgrounds
- `text-primary-foreground` for text on primary backgrounds
- `border-border` for consistent borders

## Component Guidelines

### Button Variants
- **Primary**: `btn-primary` class for main actions
- **Secondary**: `btn-secondary` class for secondary actions
- **Custom**: Use `Button` component with `variant` prop

### Cards and Containers
- **Modern Card**: `modern-card` class for elevated containers
- **Glass Effect**: `glass` class for transparent overlays
- **Hover Effects**: `modern-card-hover` for interactive cards

## Best Practices

1. **Use Semantic Classes**: Prefer `bg-primary` over `bg-teal-500`
2. **Consistent Spacing**: Use the predefined spacing scale
3. **Hover States**: Always include hover states for interactive elements
4. **Dark Mode**: Test all changes in both light and dark modes
5. **Accessibility**: Ensure sufficient contrast ratios

## Common Patterns

### Gradient Backgrounds
```css
.gradient-bg        /* Light theme gradient */
.gradient-bg-dark   /* Dark theme gradient */
```

### Interactive Elements
```css
.btn-primary        /* Primary button style */
.btn-secondary      /* Secondary button style */
.form-input         /* Consistent form inputs */
```

### Animations
```css
.animate-fade-in    /* Smooth fade in */
.animate-slide-up   /* Slide up animation */
.hover-scale        /* Scale on hover */
```

## Troubleshooting

### Color Not Appearing
1. Check if the color is defined in CSS variables
2. Verify Tailwind config includes the color
3. Ensure proper HSL format: `hsl(var(--color-name))`

### Dark Mode Issues
1. Verify both light and dark variants are defined
2. Check if component uses semantic classes
3. Test with `dark` class on html element
