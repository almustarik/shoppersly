"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  MessageCircle,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { activityFeed, type ActivityItem } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

const activityConfig: Record<
  ActivityItem["type"],
  { icon: typeof ShoppingBag; bg: string; fg: string }
> = {
  order: { icon: ShoppingBag, bg: "bg-indigo-50", fg: "text-indigo-600" },
  payment: { icon: CreditCard, bg: "bg-emerald-50", fg: "text-emerald-600" },
  delivery: { icon: Truck, bg: "bg-violet-50", fg: "text-violet-600" },
  message: {
    icon: MessageCircle,
    bg: "bg-blue-50",
    fg: "text-blue-600",
  },
  review: { icon: Star, bg: "bg-amber-50", fg: "text-amber-600" },
};

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-0">
            {activityFeed.map((item, index) => {
              const config = activityConfig[item.type];
              const Icon = config.icon;
              const isLast = index === activityFeed.length - 1;

              return (
                <div key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
                  {!isLast && (
                    <div className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-border" />
                  )}
                  <div
                    className={cn(
                      "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                      config.bg,
                      config.fg
                    )}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm text-foreground leading-snug">
                      {item.message}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
