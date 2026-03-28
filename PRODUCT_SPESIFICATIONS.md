# Product Specifications: Majang Buku Community Website

## 1. Overview

This document outlines the technical specifications for the Majang Buku community website, a premium company community profile website showcasing their identity and activities.

## 2. Technical Stack

- **Framework**: Next.js 16.2.0 (App Router)
- **CMS**: Payload CMS 3.79.1 (Headless)
- **Package Manager**: pnpm v9 (v9.15.9) via Corepack
- **Styling**: CSS Modules & SCSS (for Admin customization)
- **Database**: PostgreSQL with `@payloadcms/db-postgres` (Supabase Managed)
- **Storage**: Supabase Storage (S3-compatible)
- **Testing**: Vitest (Integration) and Playwright (E2E)
- **Deployment**: Vercel (Frontend) and Supabase (Managed PostgreSQL).
- **Runtime**: Node.js ^18.20.2 || >=20.9.0

## 3. Infrastructure

- **Database**: Supabase managed PostgreSQL.
  - Connection URI is defined via the `DATABASE_URI` environment variable.
- **Storage**: Supabase Storage (S3-compatible).
  - Configuration is defined via `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, and `S3_BUCKET` environment variables.
- **Deployment**: Vercel for the Next.js frontend, and Supabase for the PostgreSQL database.
- **Docker**: Docker and Docker Compose are optional for local development. A `docker-compose.yml` file is provided to setup the application with local postgresql database.

## 4. Payload CMS Configuration

- **Collections**: Users, Media, Events, FAQ, SocialMedia, Books, BookCategories, BorrowingRecords
- **Globals**: HomePage, BiographyPage, EventsPage, FaqPage, SiteSettings
- **Editor**: Lexical Editor
- **Typescript**: Types are generated using `pnpm generate:types` and outputted to `src/payload-types.ts`.

## 5. Environment Variables

The following environment variables are required:

- `DATABASE_URI`: PostgreSQL connection string.
- `PAYLOAD_SECRET`: Payload CMS secret key.
- `NEXT_PUBLIC_SERVER_URL`: URL of the Next.js server.
- `S3_ENDPOINT`: Supabase Storage endpoint.
- `S3_REGION`: Supabase Storage region.
- `S3_ACCESS_KEY_ID`: Supabase Storage access key ID.
- `S3_SECRET_ACCESS_KEY`: Supabase Storage secret access key.
- `S3_BUCKET`: Supabase Storage bucket name.

See `.env.example` for an example configuration.

## 6. Next.js Configuration

The Next.js application is configured with the following:

- `output: 'standalone'`
- Image optimization is configured to allow remote patterns from Supabase Storage and Netlify.

## 7. Dependencies

The project uses the following main dependencies:

- `@payloadcms/db-postgres`
- `@payloadcms/next`
- `@payloadcms/richtext-lexical`
- `@payloadcms/storage-s3`
- `@payloadcms/ui`
- `next`
- `react`
- `react-dom`
- `sharp`

Refer to `package.json` for a complete list of dependencies.

## 8. Scripts

The following scripts are available:

- `build`: Builds the project.
- `dev`: Runs the development server.
- `devsafe`: Runs the development server after cleaning the `.next` directory.
- `generate:importmap`: Generates the import map for the admin panel.
- `generate:types`: Generates the TypeScript types for Payload CMS.
- `lint`: Runs the linter.
- `payload`: Runs Payload CMS.
- `payload:migrate`: Runs Payload CMS migrations.
- `payload:migrate:create`: Creates a new Payload CMS migration.
- `payload:migrate:down`: Runs a Payload CMS migration down.
- `payload:db-push`: Pushes the database schema.
- `start`: Starts the production server.
- `test`: Runs all tests (integration and E2E).
- `test:e2e`: Runs E2E tests.
- `test:int`: Runs integration tests.

## 9. Testing

- **Integration Tests**: Vitest.
- **E2E Tests**: Playwright.

## 10. Local Development with Docker

To run the project locally with Docker:

1.  Configure `.env`.
2.  Run `docker compose up -d`.

The application will be available at `http://localhost:3001`.

To stop Docker, run `docker compose down`.

## 11. Gitignore

The project uses a `.gitignore` file to exclude the following files and directories:

- `node_modules`
- `.next`
- `.payload`
- `payload-types.ts`
- `.env`
- `.env.local`

## 12. Project Structure

- `src/collections/`: Configuration for data collections (Users, Media, Events, etc).
- `src/globals/`: Configuration for global data (Biography, Settings, etc).
- `src/app/`: Next.js application folder (contains frontend and admin routes).
- `public/`: Static files such as images, logos, and favicons.
