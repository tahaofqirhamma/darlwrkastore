-- Fix: order.client_id must reference "AppUsers" (customers), not "client".
-- If the DB still has the old FK pointing to "client", drop it and point to AppUsers.
ALTER TABLE "order" DROP CONSTRAINT IF EXISTS "order_client_id_fkey";
ALTER TABLE "order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."AppUsers"("id") ON DELETE no action ON UPDATE no action;
