# DevOps & Infrastructure Rules - Majang Buku

## Technology Stack

- **Package Manager**: pnpm v9 (9.15.9) via Corepack.
- **Environment**: Next.js 16 (Node.js >=18.20.2 or >=20.9.0).
- **Database**: PostgreSQL (v15).
- **Containerization**: Docker & Docker Compose.

## Local Development Workflow

1. **Corepack**: Ensure `corepack enable` is run before `pnpm install`.
2. **Environment Variables**:
   - `DATABASE_URI`: `postgresql://postgres:password@localhost:5435/majangbuku`.
   - `PAYLOAD_SECRET`: Ensure this is set.
   - `NEXT_PUBLIC_SERVER_URL`: `http://localhost:3000`.
3. **Docker**:
   - PostgreSQL runs on port `5435` (host) and `5432` (container).
   - App runs on port `3001` (host) and `3000` (container).
4. **Scripts**:
   - `pnpm devsafe`: Recommended for clean development (removes `.next` before starting).
   - `pnpm generate:types`: Generates TypeScript interfaces from Payload config.
   - `pnpm payload:db-push`: Pushes schema changes to the database.

## Testing Strategy

1. **Integration**: `pnpm run test:int` (Vitest).
2. **E2E**: `pnpm run test:e2e` (Playwright).
3. **Full Suite**: `pnpm test`.

## Deployment

- **Platform**: Vercel (Frontend), PostgreSQL (Dockerized or Managed).
- **Build Command**: `cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=8000" next build`.
- **Production Build**: `pnpm build:prod`.

## Best Practices

- **No Direct Commits to secrets**: Use `.env` and `.env.example`.
- **Always update imports**: Run `pnpm generate:importmap` after creating/modifying components.
- **Strict Linting**: Run `pnpm lint` before pushing.
- **Database Safety**: Use `pnpm payload:migrate:create` for complex schema changes instead of `db-push`.
