# Backend Development Rules - Majang Buku

## Technology Stack

- **CMS**: Payload CMS 3.x
- **Database**: PostgreSQL with `@payloadcms/db-postgres`
- **Editor**: Lexical Rich Text Editor
- **Image Processing**: Sharp

## Core Principles

1. **TypeScript-First**: Always use TypeScript with proper types from Payload.
2. **Type Generation**: Run `pnpm generate:types` after schema changes.
3. **Database Configuration**:
   - Use the `sanitizeUrl` function in `payload.config.ts`.
   - Fallback DATABASE_URI: `postgresql://postgres:password@localhost:5435/majangbuku`.
4. **Transaction Safety**: Always pass `req` to nested operations in hooks.

## Collection & Global Management

1. **Collections**: Users, Media, Events, FAQ, SocialMedia, BookCategories, Books, BorrowingRecords.
2. **Globals**: BiographyPage, EventsPage, FaqPage.
3. **Admin Customization**:
   - Custom Logo: `/components/Graphics/Logo#Logo`
   - Custom Icon: `/components/Graphics/Icon#Icon`
   - Meta title suffix: `- Majang Buku`.

## Access Control Patterns

1. **Anyone**: `() => true` (e.g., FAQ, Social Media, Public Pages).
2. **Authenticated**: `({ req: { user } }) => Boolean(user)` (e.g., Admin Panel, Books Management).
3. **Security**: When passing `user` to Local API, ALWAYS set `overrideAccess: false`.

## Hooks & Logic

1. **Borrowing System**:
   - Hooks should update `borrowCount` and status (`Available`/`Borrowed`).
   - Use `beforeChange` for business logic and `afterChange` for side effects.
2. **Rich Text**: Use Lexical for all formatted content. Ensure links/URLs are supported in Biography content.

## Best Practices

- Keep collections and globals in separate files in `src/collections/` and `src/globals/`.
- Use `as const` for field options (e.g., Book status).
- Index frequently queried fields (e.g., `slug`).
