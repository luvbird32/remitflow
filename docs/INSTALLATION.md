
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

## 🔧 Backend Setup (Optional)

The frontend includes mock data and services, but you can also run the backend:

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Start Backend Server

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
docker run -p 5173:5173 remitflow
```

## ✅ Verification

After installation, verify everything is working:

1. **Frontend**: Visit `http://localhost:5173`
2. **Backend** (if running): Visit `http://localhost:3001/health`
3. **Check Console**: No error messages should appear

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001/api` |
| `VITE_APP_ENV` | Application environment | `development` |
| `VITE_APP_SECRET_KEY` | Application secret key | Required |

### Build Configuration

The project uses Vite for building. You can customize the build in `vite.config.ts`:

```typescript
export default defineConfig({
  // Your custom configuration
  server: {
    port: 5173,
    host: true
  }
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find and kill process using port 5173
   lsof -ti:5173 | xargs kill
   ```

2. **Node Version Issues**
   ```bash
   # Use Node Version Manager
   nvm use 18
   ```

3. **Dependency Conflicts**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Need Help?

- Check our [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Visit our [Issue Tracker](https://github.com/your-org/remitflow/issues)
- Join our [Community Discord](https://discord.gg/remitflow)

## 📈 Next Steps

- Read the [Quick Start Guide](./QUICK_START.md) to learn basic usage
- Explore the [Development Setup](./DEVELOPMENT.md) for advanced configuration
- Check out the [Contributing Guide](./CONTRIBUTING.md) to start contributing
