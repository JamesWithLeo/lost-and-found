CREATE TYPE "public"."approvalStatus" AS ENUM('approved', 'pending', 'decline');--> statement-breakpoint
ALTER TABLE "claims" ALTER COLUMN "approvalStatus" SET DATA TYPE approvalStatus;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-06T03:54:06.211Z';