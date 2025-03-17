ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T02:39:06.824Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "item_status" "status" DEFAULT 'pending' NOT NULL;