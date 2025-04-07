ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-06T03:57:32.636Z';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "decline_at" timestamp with time zone;