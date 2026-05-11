import { StatsCards } from "./dashboard/_components/stats-cards";
import { RevenueChart } from "./dashboard/_components/revenue-chart";
import { OrdersChart } from "./dashboard/_components/orders-chart";
import { RecentOrders } from "./dashboard/_components/recent-orders";
import { TopProducts } from "./dashboard/_components/top-products";
import { ActivityFeed } from "./dashboard/_components/activity-feed";
import { CourierStatus } from "./dashboard/_components/courier-status";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {getGreeting()}, Rahim
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{formatDate()}</p>
      </div>

      {/* Stats Row */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <OrdersChart />
        </div>
      </div>

      {/* Orders Table */}
      <RecentOrders />

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TopProducts />
        <ActivityFeed />
        <CourierStatus />
      </div>
    </div>
  );
}
