# Gunakan Node.js sebagai base image
FROM node:20-alpine AS base

# Install pnpm menggunakan corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 2. Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

RUN pnpm run build

# 3. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 node-group && \
    adduser --system --uid 1001 node-user

# Copy file yang diperlukan dari builder untuk standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permission
RUN chown -R node-user:node-group /app

USER node-user

EXPOSE 3000
ENV PORT=3000

# Jalankan menggunakan node server.js
CMD ["node", "server.js"]
