import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE IF EXISTS "events" ADD COLUMN IF NOT EXISTS "image_url" varchar;
    ALTER TABLE IF EXISTS "biography_page" ADD COLUMN IF NOT EXISTS "image_url" varchar;
    ALTER TABLE IF EXISTS "events_page" ADD COLUMN IF NOT EXISTS "image_url" varchar;
    ALTER TABLE IF EXISTS "faq_page" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE IF EXISTS "faq_page" ADD COLUMN IF NOT EXISTS "image_url" varchar;
    
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'faq_page_image_id_media_id_fk') THEN
        ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'faq_page_image_idx') THEN
        CREATE INDEX "faq_page_image_idx" ON "faq_page" USING btree ("image_id");
      END IF;
    END $$;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE IF EXISTS "faq_page" DROP CONSTRAINT IF EXISTS "faq_page_image_id_media_id_fk";
    DROP INDEX IF EXISTS "faq_page_image_idx";
    ALTER TABLE IF EXISTS "events" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE IF EXISTS "biography_page" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE IF EXISTS "events_page" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE IF EXISTS "faq_page" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE IF EXISTS "faq_page" DROP COLUMN IF EXISTS "image_url";`)
}
