import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "books" ALTER COLUMN "cover_image_id" DROP NOT NULL;
  ALTER TABLE "biography_page" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "events_page" ALTER COLUMN "image_id" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "books" ALTER COLUMN "cover_image_id" SET NOT NULL;
  ALTER TABLE "biography_page" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "events_page" ALTER COLUMN "image_id" SET NOT NULL;`)
}
