ALTER TABLE "items" DROP CONSTRAINT "items_item_name_unique";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T12:53:49.805Z';