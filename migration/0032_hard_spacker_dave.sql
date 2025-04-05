ALTER TABLE "claims" RENAME COLUMN "claimed_at" TO "approved_at";--> statement-breakpoint
ALTER TABLE "claims" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T08:53:55.203Z';