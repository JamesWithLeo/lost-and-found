ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-03-21T20:15:38.025Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-21T20:15:38.023Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DEFAULT '[]'::jsonb;