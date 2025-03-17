ALTER TABLE "items" RENAME COLUMN "claimant" TO "claimant_count";--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-15T04:01:04.348Z';