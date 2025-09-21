import { StoreHeader } from "@/components/store-header";
import { StatsCards } from "@/components/stats-cards";
import { OrdersTable } from "@/components/orders-table";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";
export default async function StoreDashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-background">
      <p>Hello {data.user.email}</p>
      <form action={logout}>
        <Button type="submit">Logout</Button>
      </form>

      <StoreHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Store Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your store performance and manage orders
          </p>
        </div>
        <StatsCards />
        <OrdersTable />
      </main>
    </div>
  );
}
