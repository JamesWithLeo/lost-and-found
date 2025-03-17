CREATE TYPE "public"."status" AS ENUM('pending', 'expired', 'completed');--> statement-breakpoint
CREATE TABLE "category" (
	"256" varchar NOT NULL,
	"id" integer PRIMARY KEY NOT NULL,
	CONSTRAINT "category_256_unique" UNIQUE("256")
);
--> statement-breakpoint
ALTER TABLE "items" RENAME COLUMN "name" TO "item_name";--> statement-breakpoint
ALTER TABLE "items" RENAME COLUMN "description" TO "color";--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_found_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_lost_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T02:24:11.883Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "brand_model" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "time_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "caption" text NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "desc" text;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "found_by";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "lost_by";--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_item_name_unique" UNIQUE("item_name");