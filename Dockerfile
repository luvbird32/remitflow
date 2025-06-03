
# Multi-stage build for RemitFlow
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Build backend
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S remitflow -u 1001

# Set working directory
WORKDIR /app

# Copy backend dependencies
COPY --from=builder /app/backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built applications
COPY --from=builder --chown=remitflow:nodejs /app/dist ./public
COPY --from=builder --chown=remitflow:nodejs /app/backend/dist ./

# Switch to non-root user
USER remitflow

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
