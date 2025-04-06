ALTER TABLE "claims" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-06T03:51:00.938Z';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "approvalStatus" "type" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "claims" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "claimant_count";