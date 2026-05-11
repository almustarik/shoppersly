"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { courierProviders } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

export function CourierStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Courier Status</CardTitle>
          <CardDescription>Delivery partner overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {courierProviders.map((courier) => (
              <div
                key={courier.id}
                className="rounded-xl border border-border bg-card p-3"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg text-xs font-bold text-white",
                      courier.color
                    )}
                  >
                    {courier.logo}
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {courier.name}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-amber-500">
                      <Package className="size-3.5" />
                    </div>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      {courier.pendingPickups}
                    </p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      Pickup
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500">
                      <Truck className="size-3.5" />
                    </div>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      {courier.inTransit}
                    </p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      Transit
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-emerald-500">
                      <CheckCircle className="size-3.5" />
                    </div>
                    <p className="mt-1 text-lg font-bold text-foreground">
                      {courier.deliveredToday}
                    </p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      Delivered
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
