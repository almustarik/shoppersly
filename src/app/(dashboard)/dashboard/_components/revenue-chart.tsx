"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { revenueData } from "@/mock/dashboard-data";
import { cn } from "@/lib/utils";

const timeRanges = ["7D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

function getFilteredData(range: TimeRange) {
  if (range === "7D") return revenueData.slice(-7);
  if (range === "90D") return revenueData;
  return revenueData;
}

function formatBDT(value: number) {
  if (value >= 100000) return `৳${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `৳${(value / 1000).toFixed(0)}k`;
  return `৳${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-[#0F172A] p-3 shadow-lg">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">
        ৳{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

export function RevenueChart() {
  const [range, setRange] = useState<TimeRange>("30D");
  const data = getFilteredData(range);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.18 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-[14px] font-semibold">
            Revenue Overview
          </CardTitle>
          <CardAction>
            <div className="flex items-center gap-0.5">
              {timeRanges.map((r) => (
                <Button
                  key={r}
                  variant={range === r ? "secondary" : "ghost"}
                  size="xs"
                  className={cn(
                    "text-xs",
                    range === r && "font-semibold"
                  )}
                  onClick={() => setRange(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  interval={range === "7D" ? 0 : 4}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  tickFormatter={formatBDT}
                  width={55}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "#E2E8F0", strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
