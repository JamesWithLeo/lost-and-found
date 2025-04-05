ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T10:22:42.391Z';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;