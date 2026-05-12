"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { recentOrders, type OrderStatus } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  Confirmed: "bg-sky-50 text-sky-700 border border-sky-200",
  Shipped: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export function RecentOrders() {
  if (!recentOrders.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] font-semibold">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No orders yet"
            description="When customers place orders, they'll appear here."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.24 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] font-semibold">
            Recent Orders
          </CardTitle>
          <CardAction>
            <a
              href="/orders"
              className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary transition-colors duration-150 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              View All
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </CardAction>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto rounded-b-xl">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th
                    scope="col"
                    className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell"
                  >
                    Products
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2.5 text-right text-[12px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="hidden px-4 py-2.5 text-left text-[12px] font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#F1F5F9] transition-colors duration-100 last:border-b-0 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 text-[14px] font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-[14px] font-medium text-foreground">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.phone}
                        </p>
                      </div>
                    </td>
                    <td className="hidden max-w-[200px] truncate px-4 py-3 text-[14px] text-muted-foreground md:table-cell">
                      {order.products}
                    </td>
                    <td className="px-4 py-3 text-right text-[14px] font-medium tabular-nums text-foreground">
                      {order.formattedTotal}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        title={order.status}
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-medium",
                          statusStyles[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-[14px] text-muted-foreground sm:table-cell">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
