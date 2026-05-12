"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { topProducts } from "@/mock/dashboard-data";

export function TopProducts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!topProducts.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] font-semibold">
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No products yet"
            description="Your best-selling products will show up here."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.27 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] font-semibold">
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="w-5 shrink-0 text-center text-[13px] font-semibold tabular-nums text-muted-foreground">
                  {index + 1}
                </span>
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-5 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.category} &middot; {product.unitsSold} sold
                      </p>
                    </div>
                    <p className="shrink-0 text-[14px] font-semibold tabular-nums text-foreground">
                      {product.formattedRevenue}
                    </p>
                  </div>
                  <div
                    className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary/15"
                    role="progressbar"
                    aria-valuenow={product.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${product.name}: ${product.progress}% of top revenue`}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                      style={{
                        width: mounted ? `${product.progress}%` : "0%",
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
