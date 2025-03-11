CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"location" text NOT NULL,
	"status" text DEFAULT 'lost',
	"found_by" uuid,
	"lost_by" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(256),
	"lastName" varchar(256),
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email" text,
	"google_id" text,
	"facebook_id" text,
	"github_id" text,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_facebook_id_unique" UNIQUE("facebook_id"),
	CONSTRAINT "users_github_id_unique" UNIQUE("github_id")
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_found_by_users_id_fk" FOREIGN KEY ("found_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_lost_by_users_id_fk" FOREIGN KEY ("lost_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;