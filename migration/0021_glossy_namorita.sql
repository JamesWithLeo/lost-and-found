ALTER TABLE "claims" ALTER COLUMN "claimed_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-21T20:11:47.255Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "created_at" text DEFAULT '2025-03-21T20:11:47.256Z';