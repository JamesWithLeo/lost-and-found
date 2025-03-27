ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-03-24T13:19:11.459Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-24T13:19:11.458Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "item_proof" SET DEFAULT '{"proofs":[]}'::jsonb;