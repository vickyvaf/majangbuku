import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "biography_page" ALTER COLUMN "content" DROP NOT NULL;
    ALTER TABLE "books" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "books" ADD COLUMN IF NOT EXISTS "cover_image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "biography_page" ALTER COLUMN "content" SET NOT NULL;
    ALTER TABLE "books" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "books" DROP COLUMN IF EXISTS "cover_image_url";`)
}
