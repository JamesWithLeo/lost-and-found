ALTER TABLE "claims" DROP CONSTRAINT "claims_user_id_item_id_pk";--> statement-breakpoint
ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-04-03T23:58:50.259Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-03T23:58:50.257Z';--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "caption" varchar(255);--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "distinctFeature" text;--> statement-breakpoint
ALTER TABLE "claims" ADD COLUMN "item_proof" text[] DEFAULT '{}';