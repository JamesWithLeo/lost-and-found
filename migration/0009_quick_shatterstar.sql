ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-14T16:06:02.341Z';--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;