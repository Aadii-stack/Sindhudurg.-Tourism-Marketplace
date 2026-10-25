# Multi-stage build for Sindhudurg Tourism & Marketplace
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production bundle
RUN npm run build

# Production server using lightweight static server
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV PORT=3000

CMD ["serve", "-s", "dist", "-l", "3000"]
