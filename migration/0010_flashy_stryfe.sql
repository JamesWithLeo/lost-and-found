CREATE TYPE "public"."type" AS ENUM('lost', 'stolen', 'missing', 'found');--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T16:47:36.973Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "type" "type" DEFAULT 'lost' NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."items" ALTER COLUMN "item_status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'expired', 'returned');--> statement-breakpoint
ALTER TABLE "public"."items" ALTER COLUMN "item_status" SET DATA TYPE "public"."status" USING "item_status"::"public"."status";