ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-15T02:07:15.319Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "item_status" "status" DEFAULT 'pending' NOT NULL;