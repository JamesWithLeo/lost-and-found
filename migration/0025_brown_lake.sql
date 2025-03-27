ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-03-24T13:43:00.189Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-24T13:43:00.188Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DEFAULT '{}';


