import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "home_page_strips" CASCADE;
   DROP TABLE IF EXISTS "home_page" CASCADE;
   
   CREATE TABLE "home_page_strips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_subtitle" varchar DEFAULT 'Selamat Datang di Majang Buku' NOT NULL,
  	"default_title" varchar DEFAULT 'Kegiatan Pilihan' NOT NULL,
  	"default_description" varchar DEFAULT 'Jelajahi berbagai inisiatif literasi bersama kami' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_page_strips" ADD CONSTRAINT "home_page_strips_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_strips" ADD CONSTRAINT "home_page_strips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_strips_order_idx" ON "home_page_strips" USING btree ("_order");
  CREATE INDEX "home_page_strips_parent_id_idx" ON "home_page_strips" USING btree ("_parent_id");
  CREATE INDEX "home_page_strips_image_idx" ON "home_page_strips" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_strips" CASCADE;
  DROP TABLE "home_page" CASCADE;`)
}
