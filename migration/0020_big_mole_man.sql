CREATE TABLE "claims" (
	"user_id" uuid NOT NULL,
	"item_id" uuid NOT NULL,
	"claimed_at" timestamp DEFAULT now(),
	CONSTRAINT "claims_user_id_item_id_pk" PRIMARY KEY("user_id","item_id")
);
--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "created_at" SET DEFAULT '2025-03-20T09:37:39.356Z';--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE cascade ON UPDATE no action;