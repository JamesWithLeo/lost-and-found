ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-19T05:50:15.999Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "item_proof" json DEFAULT '[]'::json;