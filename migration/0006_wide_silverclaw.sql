ALTER TABLE "items" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "time_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T03:00:09.410Z';