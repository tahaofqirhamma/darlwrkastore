CREATE TABLE "client" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phone_number" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"delivery_date" date,
	"delivery_fees" real DEFAULT '0',
	"order_id" integer
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date,
	"status" text DEFAULT 'pending' NOT NULL,
	"is_big" boolean DEFAULT false NOT NULL,
	"quantity" double precision NOT NULL,
	"total_cost" double precision,
	"client_id" integer NOT NULL,
	"delivery_id" integer
);
--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;