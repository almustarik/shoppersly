"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { topProducts } from "@/mock/dashboard-data";

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best selling items this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Package className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-foreground">
                      {product.formattedRevenue}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      {product.category} · {product.unitsSold} sold
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${product.progress}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                    />
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
