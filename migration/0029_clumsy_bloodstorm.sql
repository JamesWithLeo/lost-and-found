ALTER TABLE "claims" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "claims" ADD PRIMARY KEY ("item_id");--> statement-breakpoint
ALTER TABLE "claims" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T08:17:59.187Z';--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-04-04T08:17:59.185Z';