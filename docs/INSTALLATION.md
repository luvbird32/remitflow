
# Installation Guide

This guide will help you install and set up RemitFlow on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **Bun** (recommended)
- **Git** (for cloning the repository)

## 🚀 Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/remitflow.git
cd remitflow
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Using npm:
```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development

# Security
VITE_APP_SECRET_KEY=your-secret-key-here

# External APIs (Optional)
VITE_EXCHANGE_API_KEY=your-exchange-api-key
VITE_ANALYTICS_ID=your-analytics-id
```

### 4. Start Development Server

Using Bun:
```bash
bun run dev
```

Using npm:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Backend Setup

The frontend includes comprehensive mock data and services, but you can also run the backend:

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Backend Environment

```bash
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173

# Database (if using)
DATABASE_URL=your-database-url

# External Services
EXCHANGE_API_KEY=your-exchange-api-key
PAYMENT_GATEWAY_KEY=your-payment-key
```

### 4. Start Backend Server

```bash
npm run dev
```

The backend API will be available at `http://localhost:3001`

## 🐳 Docker Installation (Alternative)

### Using Docker Compose

```bash
# Clone the repository
git clone https://github.com/your-org/remitflow.git
cd remitflow

# Start with Docker Compose
docker-compose up -d
```

### Using Docker

```bash
# Build the image
docker build -t remitflow .

# Run the container
docker run -p 5173:5173 -p 3001:3001 remitflow
```

## ✅ Verification

After installation, verify everything is working:

1. **Frontend**: Visit `http://localhost:5173`
   - You should see the RemitFlow homepage
   - Navigation should work properly
   - Transfer form should be accessible

2. **Backend** (if running): Visit `http://localhost:3001/health`
   - Should return a healthy status
   - API endpoints should be accessible

3. **Check Console**: No error messages should appear in the browser console

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001/api` | Yes |
| `VITE_APP_ENV` | Application environment | `development` | Yes |
| `VITE_APP_SECRET_KEY` | Application secret key | - | Yes |
| `VITE_EXCHANGE_API_KEY` | External exchange API key | - | No |
| `VITE_ANALYTICS_ID` | Analytics tracking ID | - | No |

### Development vs Production

**Development:**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development
```

**Production:**
```env
VITE_API_BASE_URL=https://api.remitflow.com/api
VITE_APP_ENV=production
```

### Build Configuration

The project uses Vite for building. Customize in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 📦 Dependencies Overview

### Core Dependencies

- **React 18**: UI framework with latest features
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Modern component library

### Key Libraries

- **@tanstack/react-query**: Data fetching and state management
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API calls
- **lucide-react**: Icon library
- **zod**: Runtime type validation

### Development Dependencies

- **@testing-library/react**: React testing utilities
- **jest**: Testing framework
- **eslint**: Code linting
- **prettier**: Code formatting

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find and kill process using port 5173
   lsof -ti:5173 | xargs kill -9
   
   # Or use a different port
   bun run dev -- --port 3000
   ```

2. **Node Version Issues**
   ```bash
   # Check your Node version
   node --version
   
   # Use Node Version Manager if needed
   nvm install 18
   nvm use 18
   ```

3. **Dependency Conflicts**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules bun.lockb package-lock.json
   bun install
   
   # Or with npm
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build Errors**
   ```bash
   # Check TypeScript errors
   bun run type-check
   
   # Check linting
   bun run lint
   
   # Fix auto-fixable issues
   bun run lint:fix
   ```

5. **Environment Variables Not Loading**
   ```bash
   # Ensure .env file exists and has correct format
   cat .env
   
   # Restart development server after changes
   ```

### Memory Issues

If you encounter memory issues during build:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
bun run build
```

### Network Issues

If experiencing network issues:

```bash
# Clear npm cache
npm cache clean --force

# Use different registry
npm config set registry https://registry.npmjs.org/

# Check proxy settings
npm config get proxy
npm config get https-proxy
```

## 🔄 Updates and Maintenance

### Keeping Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Or with Bun
bun update
```

### Security Audits

```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Or with Bun
bun audit
```

## 📈 Performance Optimization

### Development Performance

- Use **Bun** instead of npm for faster package management
- Enable **SWC** in Vite for faster TypeScript compilation
- Use **Vite's** HMR for instant updates during development

### Build Performance

```bash
# Build with source maps for debugging
bun run build

# Analyze bundle size
bun run build -- --analyze

# Build for production (optimized)
NODE_ENV=production bun run build
```

## 📚 Next Steps

After successful installation:

1. **Read the [Quick Start Guide](./QUICK_START.md)** to learn basic usage
2. **Explore the [Architecture Guide](./ARCHITECTURE.md)** to understand the system design
3. **Check the [Component Documentation](./COMPONENTS.md)** for detailed component usage
4. **Review the [API Documentation](./API.md)** for backend integration
5. **Join our [Discord community](https://discord.gg/remitflow)** for support

## 💡 Tips for Success

### Development Workflow
- **Use TypeScript**: Leverage type safety for better development experience
- **Follow the component structure**: Keep components small and focused
- **Use the API service architecture**: Leverage the organized service layer
- **Test your changes**: Run tests before committing
- **Use dev tools**: Browser dev tools and React DevTools

### Best Practices
- **Environment separation**: Use different configs for dev/prod
- **Security**: Never commit sensitive data to git
- **Performance**: Monitor bundle size and performance metrics
- **Documentation**: Update docs when making changes
- **Code quality**: Use ESLint and Prettier consistently

## 🎉 You're All Set!

RemitFlow is now installed and ready for development! The platform provides a solid foundation for international money transfers with modern web technologies.

**Happy coding!** 🚀

---

Need help? Check our [Troubleshooting Guide](./TROUBLESHOOTING.md) or join our [Discord community](https://discord.gg/remitflow).
