# Gunakan Bun sebagai base image
FROM oven/bun:1-alpine AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# 2. Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Nonaktifkan telemetry Next.js jika diinginkan
# ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

# 3. Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 bun-group
RUN adduser --system --uid 1001 bun-user

# Copy file yang diperlukan dari builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permission
RUN chown -R bun-user:bun-group /app

USER bun-user

EXPOSE 3000
ENV PORT 3000

# Jalankan menggunakan bun
CMD ["bun", "server.js"]
