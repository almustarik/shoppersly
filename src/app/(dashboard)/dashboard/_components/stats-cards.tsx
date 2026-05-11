"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { statsCards, type StatCard } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

function useAnimatedCounter(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  return count;
}

function formatAnimatedValue(card: StatCard, animatedValue: number) {
  if (card.id === "conversion") {
    return `${animatedValue.toFixed(1)}%`;
  }
  if (card.id === "revenue") {
    const rounded = Math.round(animatedValue);
    return `৳${rounded.toLocaleString("en-IN")}`;
  }
  return Math.round(animatedValue).toString();
}

function AnimatedStatCard({
  card,
  index,
}: {
  card: StatCard;
  index: number;
}) {
  const animatedValue = useAnimatedCounter(card.value);

  const TrendIcon =
    card.trendDirection === "up"
      ? ArrowUpRight
      : card.trendDirection === "down"
        ? ArrowDownRight
        : Minus;

  const trendColor =
    card.trendDirection === "up"
      ? "text-emerald-600 bg-emerald-50"
      : card.trendDirection === "down"
        ? "text-red-600 bg-red-50"
        : "text-gray-500 bg-gray-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="pt-1">
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <card.icon className="size-5" />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                trendColor
              )}
            >
              <TrendIcon className="size-3" />
              {card.trendDirection !== "neutral" && (
                <span>{Math.abs(card.trend)}%</span>
              )}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">{card.title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {formatAnimatedValue(card, animatedValue)}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statsCards.map((card, i) => (
        <AnimatedStatCard key={card.id} card={card} index={i} />
      ))}
    </div>
  );
}
