ALTER TABLE "claims" RENAME COLUMN "item_proof" TO "proof";--> statement-breakpoint
ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T07:48:48.777Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T07:48:48.775Z';