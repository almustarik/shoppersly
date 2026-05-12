"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { statsCards, type StatCard } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

const iconTints: Record<string, { bg: string; fg: string }> = {
  revenue: { bg: "bg-emerald-500/10", fg: "text-emerald-600" },
  orders: { bg: "bg-indigo-500/10", fg: "text-indigo-600" },
  deliveries: { bg: "bg-violet-500/10", fg: "text-violet-600" },
  conversations: { bg: "bg-sky-500/10", fg: "text-sky-600" },
  conversion: { bg: "bg-amber-500/10", fg: "text-amber-600" },
};

function useAnimatedCounter(end: number, duration = 800) {
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
    return `৳${Math.round(animatedValue).toLocaleString("en-IN")}`;
  }
  return Math.round(animatedValue).toString();
}

function getTrendLabel(card: StatCard) {
  if (card.trendDirection === "neutral") return "No change from last week";
  const direction = card.trendDirection === "up" ? "increased" : "decreased";
  return `${direction} by ${Math.abs(card.trend)}% vs last week`;
}

function AnimatedStatCard({
  card,
  index,
}: {
  card: StatCard;
  index: number;
}) {
  const animatedValue = useAnimatedCounter(card.value);
  const tint = iconTints[card.id] ?? {
    bg: "bg-slate-500/10",
    fg: "text-slate-600",
  };

  const TrendIcon =
    card.trendDirection === "up"
      ? ArrowUpRight
      : card.trendDirection === "down"
        ? ArrowDownRight
        : Minus;

  const trendClasses =
    card.trendDirection === "up"
      ? "bg-emerald-50 text-emerald-700"
      : card.trendDirection === "down"
        ? "bg-rose-50 text-rose-700"
        : "bg-slate-100 text-slate-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
    >
      <div
        role="group"
        aria-label={`${card.title}: ${card.formattedValue}`}
        tabIndex={0}
        className="rounded-xl border border-border bg-white p-5 transition-colors duration-150 hover:bg-slate-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 active:scale-[0.98] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-muted-foreground">
            {card.title}
          </span>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl",
              tint.bg,
              tint.fg
            )}
            aria-hidden="true"
          >
            <card.icon className="size-5" />
          </div>
        </div>

        <p className="mt-4 text-[28px] font-bold tabular-nums tracking-tight text-foreground">
          {formatAnimatedValue(card, animatedValue)}
        </p>

        <div className="mt-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium",
              trendClasses
            )}
          >
            <TrendIcon className="size-3" aria-hidden="true" />
            {card.trendDirection !== "neutral" ? (
              <span>{Math.abs(card.trend)}% vs last week</span>
            ) : (
              <span>No change</span>
            )}
            <span className="sr-only">{getTrendLabel(card)}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
      {statsCards.map((card, i) => (
        <AnimatedStatCard key={card.id} card={card} index={i} />
      ))}
    </div>
  );
}
