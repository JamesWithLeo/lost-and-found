ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-15T03:56:38.747Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "claimant" integer DEFAULT 0;