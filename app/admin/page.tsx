import { StoreHeader } from "@/components/store-header";
import { StatsCards } from "@/components/stats-cards";
import { OrdersTable } from "@/components/orders-table";

export default function StoreDashboard() {
  return (
    <div className="min-h-screen bg-background">
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
