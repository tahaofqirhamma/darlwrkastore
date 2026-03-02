import { StoreHeader } from "@/components/store-header";
import { StatsCards } from "@/components/stats-cards";
import { OrdersTable } from "@/components/orders-table";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/simple-auth";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";
import { StatsProvider } from "@/contexts/StatsContext";

export default async function StoreDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/login");

  return (
    <StatsProvider>
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="flex flex-row justify-end items-center gap-4 w-full mr-10 p-4">
          <a href="/admin/analytics">
            <Button variant="outline" size="sm">
              Analytics v2
            </Button>
          </a>
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
