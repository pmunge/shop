# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

# Build stage
FROM node:20-bookworm-slim AS build
WORKDIR /app

# Install dependencies (only package.json and package-lock.json for layer caching)
COPY --link package.json package-lock.json ./

RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the application source code
COPY --link . .

# Build the application (assumes npm run build compiles TypeScript and Angular)
RUN npm run build

# Remove dev dependencies and reinstall only production dependencies
RUN rm -rf node_modules && \
    npm ci --production

# Production stage
FROM nginx:alpine

# Create non-root user
COPY --from=build /app/dist/shop/browser /usr/share/nginx/html

# Copy built app and production node_modules
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4000 (commonly used for Angular Universal, adjust if needed)
EXPOSE 80

# Start the server (Angular Universal SSR)
