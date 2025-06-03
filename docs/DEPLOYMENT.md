
# Deployment Guide

This guide covers deploying RemitFlow to various environments, from development staging to production.

## 📋 Deployment Overview

RemitFlow can be deployed using several methods:
- **Static hosting** (Frontend only with mock data)
- **Full-stack deployment** (Frontend + Backend)
- **Containerized deployment** (Docker/Kubernetes)
- **Serverless deployment** (Vercel, Netlify)

## 🚀 Frontend-Only Deployment

### Static Site Deployment

Perfect for demos and testing with mock data.

#### Vercel Deployment

1. **Connect Repository**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Build Settings**:
   ```json
   {
     "buildCommand": "bun run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

3. **Environment Variables**:
   ```env
   VITE_API_BASE_URL=https://your-backend.com/api
   VITE_APP_ENV=production
   ```

#### Netlify Deployment

1. **Build Configuration** (`netlify.toml`):
   ```toml
   [build]
     command = "bun run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Build and deploy
   bun run build
   netlify deploy --prod --dir=dist
   ```

#### GitHub Pages

1. **GitHub Actions** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Bun
           uses: oven-sh/setup-bun@v1
           
         - name: Install dependencies
           run: bun install
           
         - name: Build
           run: bun run build
           env:
             VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
             
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 🔧 Full-Stack Deployment

### Railway Deployment

1. **Create `railway.toml`**:
   ```toml
   [build]
     builder = "nixpacks"
   
   [deploy]
     startCommand = "npm run start"
     restartPolicyType = "ON_FAILURE"
     restartPolicyMaxRetries = 10
   ```

2. **Deploy**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway link
   railway up
   ```

### Heroku Deployment

1. **Create `Procfile`**:
   ```
   web: npm run start
   ```

2. **Create `package.json` scripts**:
   ```json
   {
     "scripts": {
       "start": "node backend/dist/server.js",
       "build": "npm run build:backend && npm run build:frontend",
       "build:backend": "cd backend && npm run build",
       "build:frontend": "bun run build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   # Install Heroku CLI
   heroku create your-app-name
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create `.do/app.yaml`**:
   ```yaml
   name: remitflow
   services:
     - name: web
       source_dir: /
       github:
         repo: your-username/remitflow
         branch: main
       run_command: npm start
       environment_slug: node-js
       instance_count: 1
       instance_size_slug: basic-xxs
       envs:
         - key: NODE_ENV
           value: production
   ```

## 🐳 Docker Deployment

### Multi-stage Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/dist ./public
COPY --from=builder /app/backend/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: frontend.Dockerfile
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:3001/api
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: backend.Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    volumes:
      - ./data:/app/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
```

### Kubernetes Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: remitflow-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: remitflow
  template:
    metadata:
      labels:
        app: remitflow
    spec:
      containers:
      - name: remitflow
        image: your-registry/remitflow:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: API_BASE_URL
          value: "https://api.remitflow.com"

---
apiVersion: v1
kind: Service
metadata:
  name: remitflow-service
spec:
  selector:
    app: remitflow
  ports:
  - port: 80
    targetPort: 3001
  type: LoadBalancer
```

## 🔐 Environment Configuration

### Production Environment Variables

```env
# Application
NODE_ENV=production
PORT=3001

# API Configuration
API_BASE_URL=https://api.remitflow.com
CORS_ORIGIN=https://remitflow.com,https://www.remitflow.com

# Security
JWT_SECRET=your-super-secure-jwt-secret
API_RATE_LIMIT=100
ENABLE_HTTPS=true

# External Services
EXCHANGE_API_KEY=your-exchange-api-key
PAYMENT_GATEWAY_KEY=your-payment-key
NOTIFICATION_API_KEY=your-notification-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
ANALYTICS_ID=your-analytics-id

# Database (if using)
DATABASE_URL=postgresql://user:pass@host:port/db
REDIS_URL=redis://user:pass@host:port
```

### Security Headers

```typescript
// Express security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.remitflow.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name remitflow.com www.remitflow.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name remitflow.com www.remitflow.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend
    location / {
        root /var/www/remitflow;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring & Analytics

### Health Checks

```typescript
// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION || '1.0.0',
    checks: {
      database: 'healthy',
      redis: 'healthy',
      externalAPIs: 'healthy'
    }
  };
  
  res.status(200).json(health);
});
```

### Error Tracking

```typescript
// Sentry integration
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Error handling middleware
app.use(Sentry.Handlers.errorHandler());
```

### Performance Monitoring

```typescript
// Custom metrics
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to track request duration
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  
  next();
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Run tests
        run: bun test
        
      - name: Type check
        run: bun run type-check
        
      - name: Lint
        run: bun run lint

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Build application
        run: bun run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          
      - name: Deploy to production
        run: |
          # Your deployment script here
          echo "Deploying to production..."
```

### Automated Testing

```yaml
name: Continuous Testing

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests
        run: npm test
        
      - name: Run integration tests
        run: npm run test:integration
        
      - name: Run E2E tests
        run: npm run test:e2e
```

## 🚨 Rollback Strategy

### Blue-Green Deployment

```bash
#!/bin/bash
# deploy.sh

# Deploy to staging (green)
kubectl apply -f k8s/staging/

# Health check
if curl -f http://staging.remitflow.com/health; then
  echo "Staging deployment successful"
  
  # Switch traffic to new version
  kubectl patch service remitflow-service -p '{"spec":{"selector":{"version":"green"}}}'
  
  echo "Production traffic switched to new version"
else
  echo "Staging deployment failed, aborting"
  exit 1
fi
```

### Database Migrations

```typescript
// Migration strategy
const runMigrations = async () => {
  try {
    // Run forward migrations
    await db.migrate.latest();
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    
    // Rollback migrations
    await db.migrate.rollback();
    throw error;
  }
};
```

## 📈 Performance Optimization

### Frontend Optimizations

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

### Backend Optimizations

```typescript
// Production optimizations
if (process.env.NODE_ENV === 'production') {
  app.use(compression());  // Gzip compression
  app.use(express.static('public', {
    maxAge: '1y',  // Cache static files
    etag: true
  }));
}

// Request caching
const cache = new Map();
app.use('/api/currencies', (req, res, next) => {
  const key = req.url;
  if (cache.has(key)) {
    return res.json(cache.get(key));
  }
  next();
});
```

## 🔍 Troubleshooting Production Issues

### Common Deployment Issues

1. **Environment variables not loading**:
   ```bash
   # Check if variables are set
   printenv | grep VITE_
   
   # Verify in application
   console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
   ```

2. **CORS issues in production**:
   ```typescript
   app.use(cors({
     origin: [
       'https://remitflow.com',
       'https://www.remitflow.com'
     ],
     credentials: true
   }));
   ```

3. **Static files not loading**:
   ```nginx
   # Nginx configuration
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
     root /var/www/remitflow;
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

### Monitoring Commands

```bash
# Check application logs
kubectl logs deployment/remitflow-app

# Monitor resource usage
kubectl top pods

# Check service status
kubectl get services

# Database connections
kubectl exec -it pod/db-pod -- psql -c "SELECT * FROM pg_stat_activity;"
```

This deployment guide provides comprehensive coverage for deploying RemitFlow in various environments. Choose the method that best fits your infrastructure and requirements.
