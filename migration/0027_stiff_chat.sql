ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T07:31:46.980Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T07:31:46.979Z';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "desc" text;