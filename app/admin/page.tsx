import { StoreHeader } from "@/components/store-header";
import { StatsCards } from "@/components/stats-cards";
import { OrdersTable } from "@/components/orders-table";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";
import { StatsProvider } from "@/contexts/StatsContext";
export default async function StoreDashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <StatsProvider>
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="flex flex-row justify-end items-center w-full mr-10 p-4">
          <form action={logout}>
            <Button type="submit">Logout</Button>
          </form>
        </div>
        <main className="container mx-auto px-4 py-8 space-y-8">
          <StatsCards />
          <OrdersTable />
        </main>
      </div>
    </StatsProvider>
  );
}
