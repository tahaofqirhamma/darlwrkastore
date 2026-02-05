CREATE TABLE IF NOT EXISTS "AppUsers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "AppUsers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"phone_number" text NOT NULL,
	"address" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "delivery" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "delivery_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"time_slot" text,
	"fees" real DEFAULT '0',
	"zone" text,
	"date" date,
	"order_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" date DEFAULT now(),
	"updated_at" date,
	"status" text DEFAULT 'pending' NOT NULL,
	"is_big" boolean DEFAULT false NOT NULL,
	"quantity" double precision NOT NULL,
	"total_cost" double precision,
	"client_id" integer NOT NULL,
	"delivery_id" integer,
	"date" date
);
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'delivery_order_id_fkey') THEN
    ALTER TABLE "delivery" ADD CONSTRAINT "delivery_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'order_client_id_fkey') THEN
    ALTER TABLE "order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."AppUsers"("id") ON DELETE no action ON UPDATE no action;
  END IF;
END $$;