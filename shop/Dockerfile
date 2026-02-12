# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

# Build stage
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (only package.json and package-lock.json for layer caching)
COPY --link package.json package-lock.json ./

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
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built app and production node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.ts ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
USER appuser

# Expose port 4000 (commonly used for Angular Universal, adjust if needed)
EXPOSE 4000

# Start the server (adjust if your start script is different)
CMD ["npm", "start"]
