
# Troubleshooting Guide

This guide helps you resolve common issues you might encounter while developing or using RemitFlow.

## 📋 Quick Diagnosis

### Check System Status
```bash
# 1. Verify Node.js version
node --version  # Should be v18.0.0+

# 2. Check if ports are available
lsof -i :5173   # Frontend port
lsof -i :3001   # Backend port

# 3. Test basic functionality
curl http://localhost:5173
curl http://localhost:3001/health
```

## 🚀 Installation & Setup Issues

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5173`

**Solutions**:
```bash
# Option 1: Kill process using the port
lsof -ti:5173 | xargs kill

# Option 2: Use different port
VITE_PORT=5174 bun run dev

# Option 3: Find what's using the port
lsof -i :5173
```

### Node.js Version Issues

**Problem**: Compatibility errors or unexpected behavior

**Solutions**:
```bash
# Check current version
node --version

# Install correct version with nvm
nvm install 18
nvm use 18
nvm alias default 18

# Or update Node.js directly
# Visit https://nodejs.org for latest version
```

### Dependency Installation Failures

**Problem**: `npm install` or `bun install` fails

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json   # or bun.lockb
npm cache clean --force
npm install

# Try with different package manager
bun install   # or npm install

# Check for conflicting global packages
npm list -g --depth=0
```

### Environment Variables Not Loading

**Problem**: Configuration not working, API calls failing

**Solutions**:
```bash
# 1. Verify .env file exists
ls -la .env

# 2. Check .env format (no spaces around =)
# ✅ Correct
VITE_API_BASE_URL=http://localhost:3001/api

# ❌ Incorrect  
VITE_API_BASE_URL = http://localhost:3001/api

# 3. Restart development server
bun run dev
```

## 🔧 Development Issues

### TypeScript Errors

**Problem**: Type errors preventing compilation

**Common Issues & Solutions**:

```typescript
// Issue: Property does not exist on type
// ❌ Problem
const user = {};
user.name = 'John';  // Error

// ✅ Solution
interface User {
  name: string;
}
const user: User = { name: 'John' };

// Issue: Argument of type 'string | undefined' is not assignable
// ❌ Problem
const value = searchParams.get('id');
parseInt(value);  // Error

// ✅ Solution
const value = searchParams.get('id');
if (value) {
  parseInt(value);
}
// Or with nullish coalescing
parseInt(searchParams.get('id') ?? '0');
```

**General TypeScript fixes**:
```bash
# Check for type errors
bun run type-check

# Clear TypeScript cache
rm -rf .tsbuildinfo
rm -rf dist/

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"
```

### Import/Export Errors

**Problem**: Module resolution failures

**Common Issues**:
```typescript
// ❌ Incorrect relative path
import Component from './Component';  // Missing .tsx

// ✅ Correct
import Component from './Component.tsx';

// ❌ Incorrect barrel export
export { default } from './Component';

// ✅ Correct barrel export
export { default as Component } from './Component';
```

### Styling Issues

**Problem**: Tailwind classes not working

**Solutions**:
```bash
# 1. Verify Tailwind is installed
npm list tailwindcss

# 2. Check tailwind.config.ts content paths
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

# 3. Restart development server
bun run dev

# 4. Check for conflicting CSS
# Remove any global CSS that might conflict
```

**Problem**: Styles not applying correctly

```tsx
// ❌ Dynamic classes may not work
const buttonClass = `bg-${color}-500`;  // May not be included in build

// ✅ Use complete class names
const buttonClass = color === 'blue' ? 'bg-blue-500' : 'bg-gray-500';

// ✅ Or use safelist in tailwind.config.ts
safelist: [
  'bg-blue-500',
  'bg-red-500',
  'bg-green-500',
]
```

### API Connection Issues

**Problem**: Frontend can't connect to backend

**Diagnosis**:
```bash
# 1. Check if backend is running
curl http://localhost:3001/health

# 2. Verify API base URL in .env
echo $VITE_API_BASE_URL

# 3. Check CORS configuration
# Look for CORS errors in browser console
```

**Solutions**:
```typescript
// Update .env file
VITE_API_BASE_URL=http://localhost:3001/api

// Verify API service configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

## 🌐 Browser-Specific Issues

### Local Storage Issues

**Problem**: Data not persisting between sessions

**Solutions**:
```typescript
// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Use with fallback
const saveData = (key: string, data: any) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    // Fallback to session storage or memory
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};
```

### CORS Issues

**Problem**: Cross-origin request blocked

**Solutions**:
```typescript
// Backend CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Frontend request configuration
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',  // Include cookies
  body: JSON.stringify(data)
});
```

### Network Request Failures

**Problem**: API requests failing or timing out

**Debugging steps**:
```typescript
// Add request/response logging
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,  // 10 second timeout
});

apiClient.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

apiClient.interceptors.response.use(
  response => {
    console.log('Response:', response.status);
    return response;
  },
  error => {
    console.error('Request failed:', error.message);
    return Promise.reject(error);
  }
);
```

## 📱 Mobile-Specific Issues

### Touch Events Not Working

**Problem**: Touch interactions not responsive

**Solutions**:
```css
/* Add touch-action CSS */
.interactive-element {
  touch-action: manipulation;
}

/* Ensure adequate touch targets */
.button {
  min-height: 44px;  /* Minimum touch target size */
  min-width: 44px;
}
```

### Viewport Issues

**Problem**: Layout not responsive on mobile

**Solutions**:
```html
<!-- Ensure viewport meta tag is present -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
/* Use proper responsive breakpoints */
.container {
  @apply px-4 sm:px-6 lg:px-8;
}

/* Prevent horizontal overflow */
body {
  overflow-x: hidden;
}
```

### Performance Issues on Mobile

**Problem**: Slow loading or interactions

**Solutions**:
```typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
});

// Debounce user inputs
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

## 🔒 Security Issues

### Content Security Policy (CSP) Violations

**Problem**: Scripts or styles blocked by CSP

**Solutions**:
```html
<!-- Update CSP headers -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### HTTPS Issues in Development

**Problem**: Mixed content warnings

**Solutions**:
```bash
# Use HTTPS in development
HTTPS=true bun run dev

# Or generate local certificates
brew install mkcert  # macOS
mkcert -install
mkcert localhost 127.0.0.1
```

## 🧪 Testing Issues

### Tests Failing

**Problem**: Unit or integration tests not passing

**Common Issues**:
```typescript
// Issue: Component not found in test
// ❌ Problem
const button = screen.getByText('Submit');

// ✅ Solution - check exact text
const button = screen.getByRole('button', { name: /submit/i });

// Issue: Async operations not waited
// ❌ Problem
fireEvent.click(button);
expect(mockFn).toHaveBeenCalled();

// ✅ Solution
fireEvent.click(button);
await waitFor(() => {
  expect(mockFn).toHaveBeenCalled();
});
```

### Mock Issues

**Problem**: Mocks not working correctly

**Solutions**:
```typescript
// Mock API calls
vi.mock('../services/apiService', () => ({
  apiService: {
    get: vi.fn(),
    post: vi.fn(),
  }
}));

// Mock React Router
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));
```

## 🚀 Performance Issues

### Slow Bundle Build

**Problem**: Vite build taking too long

**Solutions**:
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
```

### Runtime Performance Issues

**Problem**: App running slowly

**Debugging**:
```typescript
// Use React DevTools Profiler
// Wrap components to measure performance
const ProfiledComponent = (props) => {
  return (
    <Profiler id="ComponentName" onRender={onRenderCallback}>
      <YourComponent {...props} />
    </Profiler>
  );
};

// Check for unnecessary re-renders
const MemoizedComponent = React.memo(YourComponent);
```

## 🆘 Getting Help

### Debug Information to Collect

When asking for help, include:

```bash
# System information
node --version
npm --version  # or bun --version
git --version

# Project information
cat package.json | grep version
ls -la .env*

# Error information
# Copy full error messages
# Include browser console errors
# Share relevant code snippets
```

### Create Minimal Reproduction

1. **Isolate the issue**: Remove unrelated code
2. **Create a minimal example**: Smallest code that reproduces the bug
3. **Include steps to reproduce**: Clear, numbered steps
4. **Share relevant configuration**: Environment, dependencies, etc.

### Where to Get Help

1. **GitHub Issues**: [Project Issues](https://github.com/your-org/remitflow/issues)
2. **Discord Community**: [RemitFlow Discord](https://discord.gg/remitflow)
3. **Stack Overflow**: Tag questions with `remitflow`
4. **Documentation**: Check other docs in this folder

### Before Asking for Help

- [ ] Search existing issues
- [ ] Check documentation
- [ ] Try basic troubleshooting steps
- [ ] Prepare minimal reproduction
- [ ] Gather debug information

## 📚 Additional Resources

- [Installation Guide](./INSTALLATION.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [API Documentation](./API.md)
- [Architecture Overview](./ARCHITECTURE.md)

---

**Still stuck?** Don't hesitate to reach out to the community. We're here to help! 🚀
